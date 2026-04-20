import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    productId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
    },

    size: {
      type: String,
      default: "Free",
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { timestamps: true }
);

// 🔥 Prevent duplicate cart items (VERY IMPORTANT)
cartSchema.index({ userId: 1, productId: 1, size: 1 }, { unique: true });

export default mongoose.model("Cart", cartSchema);