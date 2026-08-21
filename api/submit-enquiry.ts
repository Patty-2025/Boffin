interface VercelRequest {
  method?: string;
  body?: unknown;
}

interface VercelResponse {
  status: (statusCode: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

interface EnquiryBody {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  country?: unknown;
  orderType?: unknown;
}

function isNonEmptyString(value: unknown, maxLength: number): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLength;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] || character);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  const body = req.body && typeof req.body === 'object' ? req.body as EnquiryBody : {};
  const name = isNonEmptyString(body.name, 100) ? body.name.trim() : '';
  const phone = isNonEmptyString(body.phone, 40) ? body.phone.trim() : '';
  const email = typeof body.email === 'string' && body.email.trim().length <= 254 ? body.email.trim().toLowerCase() : '';
  const country = isNonEmptyString(body.country, 100) ? body.country.trim() : '';
  const orderType = isNonEmptyString(body.orderType, 120) ? body.orderType.trim() : '';

  if (!name || !phone || !country || !orderType || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: 'Please complete all enquiry fields with valid details.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.RESEND_TO_EMAIL;
  if (!apiKey || !fromEmail || !toEmail) {
    console.error('Resend is not configured. Set RESEND_API_KEY, RESEND_FROM_EMAIL, and RESEND_TO_EMAIL.');
    return res.status(503).json({ error: 'Email service is not configured.' });
  }

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `New website enquiry from ${name}`,
        text: [`Name: ${name}`, `Phone: ${phone}`, `Email: ${email}`, `Country: ${country}`, `Order type: ${orderType}`].join('\n'),
        html: `<h2>New website enquiry</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Phone:</strong> ${escapeHtml(phone)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Country:</strong> ${escapeHtml(country)}</p><p><strong>Order type:</strong> ${escapeHtml(orderType)}</p>`,
      }),
    });

    if (!resendResponse.ok) {
      const details = await resendResponse.text();
      console.error('Resend enquiry failed:', resendResponse.status, details);
      return res.status(502).json({ error: 'We could not send your enquiry.' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend enquiry request failed:', error);
    return res.status(502).json({ error: 'We could not send your enquiry.' });
  }
}