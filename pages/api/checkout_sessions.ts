import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

const prisma = new PrismaClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (stripe == null) {
    return;
  }

  const { uid, quantity } = req.body;
  const card = await prisma.card.findFirst({ where: { uid } });

  if (card == null) {
    res.status(404).end();
    return;
  }

  const { price } = card;

  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: card.name,
                description: card.description ?? ""
              },
              unit_amount_decimal: `${price * 100}`
            },
            quantity
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url!);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}