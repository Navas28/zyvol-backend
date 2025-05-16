import express from "express";
import Stripe from "stripe";
import Order from "../models/order";
import stripe from "stripe";

const router = express.Router();

router.post("/", express.raw({ type: "application/json" }), (req, res) => {
  (async () => {
    const sig = req.headers["stripe-signature"] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error("Webhook signature error:", err);
      return res.status(400).send("Webhook Error");
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      try {
        await Order.create({
          amount: session.amount_total ? session.amount_total / 100 : 0,
          status: session.payment_status,
          paymentIntentId: session.payment_intent,
          customerDetails: {
            name: session.customer_details?.name || '',
            email: session.customer_details?.email || '',
            country: session.customer_details?.address?.country || '',
          },
          createdAt: new Date(),
        });
      } catch (error) {
        console.error("Failed to save order:", error);
      }
    }

    res.status(200).json({ received: true });
  })();
});

export default router;
