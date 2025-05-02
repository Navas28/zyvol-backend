import  express  from "express";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import productRoutes from "./routes/productRoutes";


dotenv.config()
const app = express()
const PORT = process.env.PORT || 6000;
const MONGO_URI = process.env.MONGO_URI || "";

app.use(cors())
app.use(express.json())

app.use("/api/products", productRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}  & mongoose connected`));
  })
  .catch((err) => console.error("MongoDB connection failed:", err));