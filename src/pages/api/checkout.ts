import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

interface RequestBody {
  productIds: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { productIds } = req.body as RequestBody;

  if (!productIds.length) {
    return res
      .status(400)
      .json({ error: "Must inform at least one productId" });
  }

  const products = await Promise.all(
    productIds.map((productId) => stripe.products.retrieve(productId))
  );

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: products.map((product) => ({
      price: product.default_price as string,
      quantity: 1,
    })),
  });

  return res.status(201).json({ checkoutUrl: checkoutSession.url });
}
