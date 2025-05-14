import express from "express"
import { stripe } from "../../config/stripe"

const router = express.Router()

router.post("/create-checkout-session", async (req,res) => {
    const {amount} = req.body;

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
                unit_amount: Math.round(amount * 100)
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
})

export default router;