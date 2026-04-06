import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  size: String,
  quantity: { type: Number, default: 1 }
});

export default mongoose.model("Cart", cartSchema);