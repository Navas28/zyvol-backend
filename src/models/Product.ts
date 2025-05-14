import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        category: { type: String, required: true },
        brand: { type: String, required: true },
        color: { type: String, required: true },
        productDetails: {
            manufacturer: { type: String },
            countryOfOrigin: { type: String },
            importedBy: { type: String },
            weight: { type: String },
        },
        sizes: {
            type: [Number],
            required: true,
        },
        additionalImages: [{ type: String }],
    },
    { timestamps: true }
);

const Product = mongoose.model("product", productSchema);
export default Product;
