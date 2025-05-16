import mongoose from "mongoose";

const orderShema = new mongoose.Schema({
    amount: Number,
    status: String,
    paymentIntentId: String,
    createdAt: Date,
    customerDetails: {
        name: String,
        email: String,
        country: String,
    },
});

const Order = mongoose.model("Order", orderShema);
export default Order;
