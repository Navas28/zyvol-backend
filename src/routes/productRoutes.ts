import express, { Request, Response } from "express";
import Product from "../models/Product";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

// Get single product by ID
router.get("/:id", (req: Request, res: Response) => {
    const { id } = req.params;

    // Wrapping async code in try-catch
    (async () => {
        try {
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }
            res.json(product);
        } catch (err) {
            console.error("Error fetching product:", err);
            res.status(500).json({ error: "Failed to fetch product" });
        }
    })();
});

// Get products by category
router.get("/category/:category", (req: Request, res: Response) => {
    const { category } = req.params;

    async function fetchProductsByCategory() {
        try {
            const products = await Product.find({ category });
            if (products.length === 0) {
                return res.status(404).json({ error: "No products found for this category" });
            }
            res.json(products);
        } catch (err) {
            console.error("Error fetching products by category:", err);
            res.status(500).json({ error: "Failed to fetch products by category" });
        }
    }

    fetchProductsByCategory();
});

export default router;
