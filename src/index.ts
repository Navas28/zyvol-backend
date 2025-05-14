import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";
import stripeRoutes from "./routes/stripeRoutes";
import contactsRoutes from "./routes/contactsRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/checkout", stripeRoutes);
app.use("/api/contact", contactsRoutes);

mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
        console.log("MongoDB connected successfully");
        const port = process.env.PORT || 4000;
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch((err) => {
        console.error("DB connection error:", err);
        process.exit(1);
    });
