import express, { Request, Response } from "express";
import Product from "../models/Product";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const { category, brand } = req.query;

    const filter: any = {};
    if (category && typeof category === "string") filter.category = category;
    if (brand && typeof brand === "string") filter.brand = brand;

    try {
        const products = await Product.find(filter);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/:id", (req: Request, res: Response) => {
    const { id } = req.params;

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

//   Admin panel

router.put("/:productId", async (req: Request, res: Response) => {
    (async () => {
        const { productId } = req.params;
        const updateProductData = req.body;

        try {
            const updateProduct = await Product.findByIdAndUpdate(productId, updateProductData, {
                new: true,
            });
            if (!updateProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json(updateProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error updating product" });
        }
    })();
});

router.delete("/:productId", (req: Request, res: Response) => {
    (async () => {
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
            if (!deletedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            console.error("Error deleting product", error);
            res.status(500).json({ message: "Server error deleting product" });
        }
    })();
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const newProduct = new Product(req.body);
        const saveProduct = await newProduct.save();
        res.status(201).json(saveProduct);
    } catch (error) {
        console.error("Error creating product", error);
        res.status(500).json({ error: "Failed to create product" });
    }
});

export default router;
