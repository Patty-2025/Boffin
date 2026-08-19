import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import compression from 'compression';
import Stripe from 'stripe';
import { calculatePrice } from './src/services/pricing';
import { grammarCheck } from './src/services/grammarService';

const currentDirname = typeof __dirname !== 'undefined' ? __dirname : process.cwd();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Compress all HTTP responses
  app.use(compression());
  app.use(express.json());

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

  app.post('/api/create-payment-intent', async (req, res) => {
    try {
      const { amount } = req.body;
      if (!amount) {
        return res.status(400).json({ error: 'Amount is required' });
      }

      let stripe;
      try {
        stripe = getStripe();
      } catch (err) {
        console.warn('Stripe not configured. Returning mock client secret for preview purposes.');
        return res.json({ clientSecret: 'mock_secret_for_preview' });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // convert to cents
        currency: 'usd',
        description: 'Order Payment',
        automatic_payment_methods: {
          enabled: true,
        },
        setup_future_usage: 'off',
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      if (error?.type === 'StripeAuthenticationError') {
        console.warn('Stripe Authentication Failed (Invalid API Key). Falling back to mock preview mode.');
        return res.json({ clientSecret: 'mock_secret_for_preview' });
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

  app.post('/api/subscribe', async (req, res) => {
    try {
      const { email, code } = req.body;
      if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ error: 'Valid email is required' });
      }

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

      res.json({ success: true, code: uniqueCode });
    } catch (error: any) {
      console.error('Subscription error:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
  });

  /**
   * Health Check API
   */
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Assist Bridge API is running' });
  });

  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *
Allow: /
Disallow: /portal/
Disallow: /dashboard

Sitemap: https://assistbridge.online/sitemap.xml`);
  });

  app.get('/sitemap.xml', (req, res) => {
    // Array of all main paths
    const pages = [
      '/', '/experts', '/reviews', '/samples', '/about-us', '/hire', '/contact-us', '/faqs', '/how-it-works', '/offers',
      // Services
      '/homework', '/assessment-help', '/do-my-homework', '/pay-someone-to-do-my-homework', '/online-exam-help',
      '/case-study-help', '/term-paper-help', '/powerpoint-help', '/thesis-help', '/coursework',
      '/essay-writing-service', '/essay-editing-service', '/mba-essay-writing-service', '/essay-help',
      '/research-proposal-service', '/research-paper-service', '/ghost-writer-service', '/dissertation-help-service',
      '/programming-help-service', '/online-class-help-service',
      // Tools
      '/plagiarism-checker', '/essay-typer', '/paraphrasing-tool', '/grammar-checker', '/essay-checker',
      '/factoring-calculator', '/word-counter', '/citation-generator', '/pdf-summarizer', '/other-tools',
      '/apa-citation', '/chicago-citation', '/harvard-citation', '/mla-citation', '/vancouver-citation', '/oxford-citation',
      // Countries
      '/ca', '/au', '/my', '/sg', '/hk', '/in', '/mv', '/uk', '/ie', '/nz', '/se', '/ae', '/sa', '/gh', '/qa', '/za', '/kw', '/om', '/me'
    ];
    
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
  <url>
    <loc>https://assistbridge.online${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;
    res.set('Content-Type', 'application/xml');
    res.send(xml);
  });

  app.post('/api/sync-to-zoho', async (req, res) => {
    const { orderDetails } = req.body;
    
    if (!process.env.ZOHO_CLIENT_ID || !process.env.ZOHO_CLIENT_SECRET || !process.env.ZOHO_REFRESH_TOKEN) {
      return res.status(500).json({ error: 'Zoho integration is not configured. Please contact support.' });
    }

    console.log('Syncing to Zoho:', orderDetails);
    // Logic will be added here to authenticate and push to Zoho CRM
    
    res.json({ status: 'queued', message: 'Order sync to Zoho initiated' });
  });

  app.post('/api/calculate-price', (req, res) => {
    const { pages, subject, deadline, discountCode } = req.body;
    if (!pages || !subject || !deadline) return res.status(400).json({ error: 'Missing requirements' });
    
    const price = calculatePrice(pages, subject, new Date(deadline), discountCode);
    res.json({ totalPrice: price.toFixed(2) });
  });

  /**
   * Word Counter API
   * Demonstrates a simple logical API
   */
  app.post('/api/tools/word-count', (req, res) => {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }
    
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
  app.post('/api/tools/grammar-check', async (req, res) => {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }
    
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
