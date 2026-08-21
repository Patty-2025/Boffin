import Stripe from 'stripe';

interface VercelRequest {
  method?: string;
  body?: unknown;
}

interface VercelResponse {
  status: (statusCode: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

const stripeClient = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!stripeClient) {
    return res.status(503).json({ error: 'Stripe payment is not configured.' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body as { amount?: unknown } : {};
  const amount = Number(body.amount);

  if (!Number.isFinite(amount) || amount <= 0 || amount > 100000) {
    return res.status(400).json({ error: 'A valid payment amount is required.' });
  }

  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      description: 'Order Payment',
      automatic_payment_methods: { enabled: true },
      setup_future_usage: 'off_session',
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: unknown) {
    const errorType = error && typeof error === 'object' && 'type' in error
      ? String((error as { type?: unknown }).type)
      : '';

    if (errorType === 'StripeAuthenticationError') {
      return res.status(503).json({ error: 'Stripe authentication failed.' });
    }

    console.error('Error creating payment intent:', error);
    return res.status(500).json({ error: 'Unable to initialize payment.' });
  }
}
