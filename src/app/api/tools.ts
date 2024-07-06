// pages/api/tools.js
import axios from 'axios';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { url, email } = req.body;

    try {
      const response = await axios.get(url);
      const titleMatch = response.data.match(/<title>(.*?)<\/title>/);
      const title = titleMatch ? titleMatch[1] : 'No title available';
      
      // Save tool info to the database (you would replace this with actual DB logic)
      const newTool = { url, email, title };

      // Create a Stripe Checkout session
      const stripeSession = await createStripeCheckoutSession(newTool);

      res.status(200).json({ stripeUrl: stripeSession.url });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve tool information' });
    }
  } else {
    // Handle GET requests to fetch tools with filters
    const { businessType, category } = req.query;

    // Fetch tools from the database (replace with actual DB logic)
    const tools = await fetchToolsFromDatabase({ businessType, category });

    res.status(200).json(tools);
  }
};

const createStripeCheckoutSession = async (tool) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Tool Submission',
          description: tool.title,
        },
        unit_amount: 1000,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
  });

  return session;
};

const fetchToolsFromDatabase = async (filters) => {
  // Replace with actual database fetch logic
  return [
    // Dummy tools data
    { id: 1, url: 'https://example.com', title: 'Example Tool', businessType: 'landscaping', category: 'communication' },
    // Add more tools as needed
  ];
};
