import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
  sizes: [String],
  rating: Number
});

export default mongoose.model("Product", productSchema); // ✅ FIX