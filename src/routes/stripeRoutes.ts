import express, { Request, Response } from "express";
import { stripe } from "../config/stripe";
import Order from "../models/order";

const router = express.Router();
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post("/create-checkout-session", async (req: Request, res: Response) => {
    const { amount } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: "Your Order",
                        },
                        unit_amount: Math.round(amount * 100),
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error("Stripe error", err);
        res.status(500).json({ error: "Stripe checkout failed" });
    }
});

export default router;
