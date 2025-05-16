import express, { Request, Response } from "express"
import Order from "../models/order"

const router = express.Router()

router.get("/", async (req: Request, res: Response) => {
    try {
        const orders = await Order.find().sort({createdAt: -1})
        res.json(orders)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" })
    }
})

export default router;