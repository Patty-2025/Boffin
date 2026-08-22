import 'dotenv/config';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import Stripe from 'stripe';
import { calculatePrice } from './src/services/pricing';
import { grammarCheck } from './src/services/grammarService';
import { issueVerificationCode, verifyCode } from './server/security';

const currentDirname = typeof __dirname !== 'undefined' ? __dirname : process.cwd();
const SITE_URL = 'https://boffinglobalgroup.com';

async function startServer() {
  const app = express();
  const PORT = 3000;
  app.set('trust proxy', 1);
  app.use(helmet({ crossOriginEmbedderPolicy: false }));
  app.use(express.json({ limit: '32kb' }));
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: 'draft-7', legacyHeaders: false }));
  const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-7', legacyHeaders: false, message: { error: 'Too many authentication attempts. Please try again later.' } });
  const verificationLimiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 5, standardHeaders: 'draft-7', legacyHeaders: false, message: { error: 'Too many verification requests. Please try again later.' } });
  const apiLimiter = rateLimit({ windowMs: 60 * 1000, limit: 30, standardHeaders: 'draft-7', legacyHeaders: false, message: { error: 'Too many requests. Please try again later.' } });

  // Compress all HTTP responses
  app.use(compression());

  // --- CUSTOM API ROUTES ---

  let stripeClient: Stripe | null = null;
  function getStripe(): Stripe {
    if (!stripeClient) {
      const key = process.env.STRIPE_SECRET_KEY;
      if (!key) {
        throw new Error('STRIPE_SECRET_KEY environment variable is required');
      }
      stripeClient = new Stripe(key);
    }
    return stripeClient;
  }

  const paymentSchema = z.object({ amount: z.coerce.number().finite().positive().max(100000) });
  const emailSchema = z.object({ email: z.string().trim().toLowerCase().email().max(254) });
  const verificationSchema = emailSchema.extend({ code: z.string().trim().regex(/^\d{6}$/) });
  const textSchema = z.object({ text: z.string().min(1).max(50000) });
  const discountSchema = z.object({ pages: z.coerce.number().int().min(1).max(500), subject: z.string().trim().min(1).max(200), deadline: z.string().trim().min(1).max(100), discountCode: z.string().trim().max(100).optional() });

  app.post('/api/create-payment-intent', apiLimiter, async (req, res) => {
    try {
      const parsed = paymentSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: 'A valid payment amount is required.' });
      const { amount } = parsed.data;

      let stripe;
      try {
        stripe = getStripe();
      } catch (err) {
        return res.status(503).json({ error: 'Stripe payment is not configured.' });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // convert to cents
        currency: 'usd',
        description: 'Order Payment',
        automatic_payment_methods: {
          enabled: true,
        },
        setup_future_usage: 'off_session',
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      if (error?.type === 'StripeAuthenticationError') {
        return res.status(503).json({ error: 'Stripe authentication failed.' });
      }
      console.error('Error creating payment intent:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
  });

  function generateUniqueCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude easily confused chars: I, O, 1, 0
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `WELCOME-${code}`;
  }

  app.post('/api/send-email-code', verificationLimiter, async (req, res) => {
    const parsed = emailSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Valid email is required.' });
    const { email } = parsed.data;
    let code: string;
    try { code = await issueVerificationCode(email); }
    catch (error) { if (error instanceof Error && error.message === 'RESEND_COOLDOWN') return res.status(429).json({ error: 'Please wait before requesting another code.' }); throw error; }

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const fromEmail = process.env.SMTP_FROM_EMAIL || 'support@boffinglobal.com';

    if (host && port && user && pass) {
      try {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.createTransport({ host, port: parseInt(port, 10), secure: parseInt(port, 10) === 465, auth: { user, pass } });
        await transporter.sendMail({
          from: `"BoffinGlobal" <${fromEmail}>`,
          to: email,
          subject: 'Your BoffinGlobal verification code',
          text: `Your BoffinGlobal verification code is ${code}. It expires in 10 minutes.`,
          html: `<p>Your BoffinGlobal verification code is:</p><p style="font-size:28px;font-weight:800;letter-spacing:8px">${code}</p><p>This code expires in 10 minutes.</p>`
        });
      } catch (error) {
        console.error('Verification email failed:', error);
        return res.status(500).json({ error: 'We could not send the verification email.' });
      }
    } else {
      console.warn('[Email Simulation] SMTP is not configured; verification email was not sent.');
    }

    return res.json({ success: true, message: 'If the address is eligible, a verification code has been sent.' });
  });

  app.post('/api/verify-email-code', verificationLimiter, async (req, res) => {
    const parsed = verificationSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'That code is invalid or has expired.' });
    const valid = await verifyCode(parsed.data.email, parsed.data.code);
    if (!valid) return res.status(400).json({ error: 'That code is invalid or has expired.' });
    return res.json({ success: true });
  });

  app.post('/api/subscribe', apiLimiter, async (req, res) => {
    try {
      const parsed = emailSchema.extend({ code: z.string().trim().max(100).optional() }).safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: 'Valid email is required.' });
      const { email, code } = parsed.data;

      const uniqueCode = code || generateUniqueCode();

      // Check if SMTP is configured
      const host = process.env.SMTP_HOST;
      const port = process.env.SMTP_PORT;
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;
      const fromEmail = process.env.SMTP_FROM_EMAIL || 'newsletter@assistbridge.online';

      if (host && port && user && pass) {
        try {
          const nodemailer = await import('nodemailer');
          const transporter = nodemailer.createTransport({
            host,
            port: parseInt(port, 10),
            secure: parseInt(port, 10) === 465,
            auth: { user, pass }
          });

          const htmlContent = `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #fcfbfa; border: 1px solid #e5e1da; border-radius: 16px;">
              <div style="text-align: center; margin-bottom: 24px;">
                <span style="font-size: 12px; font-weight: 900; letter-spacing: 0.1em; color: #d97706; background-color: #fef3c7; padding: 6px 12px; border-radius: 9999px;">ELITE ACADEMIC CLUB</span>
              </div>
              <h2 style="color: #0f172a; text-align: center; font-size: 24px; font-weight: 800; margin-top: 0;">Welcome to Assist Bridge!</h2>
              <p style="color: #475569; font-size: 16px; line-height: 1.6; text-align: center;">
                Thank you for subscribing to our research guidelines and professional academic writing newsletter.
              </p>
              <div style="background-color: #ffffff; border: 1px solid #f59e0b; border-radius: 12px; padding: 20px; text-align: center; margin: 30px 0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                <span style="display: block; font-size: 11px; font-weight: 700; color: #b45309; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;">Your Unique 15% Discount Code</span>
                <span style="display: inline-block; font-family: monospace; font-size: 28px; font-weight: 900; letter-spacing: 0.1em; color: #1e293b; background-color: #fef3c7; padding: 10px 24px; border-radius: 8px; border: 1px dashed #d97706; margin-bottom: 8px;">${uniqueCode}</span>
                <span style="display: block; font-size: 12px; color: #64748b; font-weight: 500;">Enter this code on the cost calculator to redeem 15% off your next academic project!</span>
              </div>
              <p style="color: #475569; font-size: 14px; line-height: 1.6;">
                In your coming newsletters, you will receive our elite study guides, step-by-step dissertation outlines, plagiarism checks, and formatting standards used by top global universities.
              </p>
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
              <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-bottom: 0;">
                © ${new Date().getFullYear()} Assist Bridge. All rights reserved.<br />
                You are receiving this email because you subscribed to our academic newsletter on assistbridge.online.
              </p>
            </div>
          `;

          await transporter.sendMail({
            from: `"Assist Bridge Newsletter" <${fromEmail}>`,
            to: email,
            subject: '🎁 Your 15% Discount Code & Welcome Academic Guides!',
            html: htmlContent,
            text: `Welcome to Assist Bridge! Your unique 15% discount code is: ${uniqueCode}. Use this code during checkout to save on your next academic project.`
          });

          console.log(`Success: Verification email with code ${uniqueCode} successfully sent to ${email}`);
        } catch (err) {
          console.error('SMTP Email sending failed:', err);
        }
      } else {
        console.log(`[Email Simulation] SMTP not fully configured in environment. Generated unique code: ${uniqueCode} for ${email}. Email template contains this promo code.`);
      }

      // 3. Sync Lead Contact directly into HubSpot CRM
      const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN;
      if (hubspotToken) {
        try {
          const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${hubspotToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              properties: {
                email: email.trim().toLowerCase(),
                firstname: 'Academic',
                lastname: 'Lead',
                hs_lead_status: 'NEW',
                message: `Subscribed to academic newsletter. Coupon code generated: ${uniqueCode}`
              }
            })
          });

          if (response.status === 201 || response.status === 200) {
            console.log(`Success: Lead ${email} successfully synchronized with HubSpot CRM Contacts!`);
          } else if (response.status === 409) {
            console.log(`Info: Lead ${email} already exists in HubSpot CRM database.`);
          } else {
            const errData = await response.json().catch(() => ({}));
            console.warn('HubSpot response warning details:', response.status, errData);
          }
        } catch (hubspotErr) {
          console.error('HubSpot CRM sync network failure:', hubspotErr);
        }
      } else {
        console.log(`[HubSpot Simulation] Token not configured. Simulated syncing new contact: ${email} to HubSpot CRM list.`);
      }

      res.json({ success: true });
    } catch (error: any) {
      console.error('Subscription error:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
  });

  /**
   * Health Check API
   */
  app.get('/api/health', apiLimiter, (req, res) => {
    res.json({ status: 'ok', message: 'Assist Bridge API is running' });
  });

  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *
Allow: /
Disallow: /portal/
Disallow: /dashboard
Disallow: /admin/

Sitemap: ${SITE_URL}/sitemap.xml`);
  });

  app.get('/sitemap.xml', (req, res) => {
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    res.sendFile(sitemapPath, (error) => {
      if (error) {
        console.error('Unable to serve sitemap.xml from public folder:', error);
        const pages = [
          '/', '/experts', '/reviews', '/samples', '/about-us', '/hire', '/contact-us', '/faqs', '/how-it-works', '/offers',
          '/homework', '/assessment-help', '/do-my-homework', '/pay-someone-to-do-my-homework', '/online-exam-help',
          '/case-study-help', '/term-paper-help', '/powerpoint-help', '/thesis-help', '/coursework',
          '/essay-writing-service', '/essay-editing-service', '/mba-essay-writing-service', '/essay-help',
          '/research-proposal-service', '/research-paper-service', '/ghost-writer-service', '/dissertation-help-service',
          '/programming-help-service', '/online-class-help-service', '/assignment-help', '/assignment-guidance',
          '/code-debugging', '/data-analysis', '/data-analysis-services', '/engineering-simulations', '/engineering-services',
          '/programming-services', '/business-services', '/solidworks', '/software-architecture', '/technical-documentation',
          '/plagiarism-checker', '/essay-typer', '/paraphrasing-tool', '/grammar-checker', '/essay-checker',
          '/factoring-calculator', '/word-counter', '/citation-generator', '/pdf-summarizer', '/other-tools',
          '/apa-citation', '/chicago-citation', '/harvard-citation', '/mla-citation', '/vancouver-citation', '/oxford-citation',
          '/writers', '/blog', '/faq', '/pricing',
          '/ca', '/au', '/my', '/sg', '/hk', '/in', '/mv', '/uk', '/ie', '/nz', '/se', '/ae', '/sa', '/gh', '/qa', '/za', '/kw', '/om', '/me'
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
  <url>
    <loc>${SITE_URL}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

        res.type('application/xml');
        res.send(xml);
      }
    });
  });

  app.post('/api/sync-to-zoho', apiLimiter, (req, res) => {
    const parsed = z.object({ orderDetails: z.record(z.string(), z.unknown()).refine((value) => JSON.stringify(value).length <= 20000) }).safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Valid order details are required.' });
    const { orderDetails } = parsed.data;
    
    if (!process.env.ZOHO_CLIENT_ID || !process.env.ZOHO_CLIENT_SECRET || !process.env.ZOHO_REFRESH_TOKEN) {
      return res.status(500).json({ error: 'Zoho integration is not configured. Please contact support.' });
    }

    console.log('Syncing to Zoho:', orderDetails);
    // Logic will be added here to authenticate and push to Zoho CRM
    
    res.json({ status: 'queued', message: 'Order sync to Zoho initiated' });
  });

  app.post('/api/calculate-price', apiLimiter, (req, res) => {
    const parsed = discountSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Missing or invalid requirements.' });
    const { pages, subject, deadline, discountCode } = parsed.data;
    
    const price = calculatePrice(pages, subject, new Date(deadline), discountCode);
    res.json({ totalPrice: price.toFixed(2) });
  });

  /**
   * Word Counter API
   * Demonstrates a simple logical API
   */
  app.post('/api/tools/word-count', apiLimiter, (req, res) => {
    const parsed = textSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Text is required and must be under 50,000 characters.' });
    const { text } = parsed.data;
    
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const characters = text.length;
    
    res.json({
      wordCount: words.length,
      characterCount: characters,
      estimatedReadingTime: Math.ceil(words.length / 200) + ' min'
    });
  });

  /**
   * Summarizer API (Conceptual)
   * This route would typically call Gemini.
   * To follow pure frontend patterns, you'd call Gemini from the browser.
   * But here is how you structure a backend AI route!
   */
  app.post('/api/tools/grammar-check', apiLimiter, async (req, res) => {
    const parsed = textSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Text is required and must be under 50,000 characters.' });
    const { text } = parsed.data;
    
    try {
      const result = await grammarCheck(text);
      res.json(result);
    } catch (error) {
      console.error('Grammar check error:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    // Set caching headers for static assets
    app.use(express.static(distPath, {
      maxAge: '1y',
      etag: true,
      lastModified: true
    }));
    app.get('*', (req, res) => {
      // Don't cache index.html
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API Health: http://localhost:${PORT}/api/health`);
  });
}

startServer();
