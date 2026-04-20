import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // ✅ FIX: use String instead of ObjectId
    userId: {
      type: String,
      required: true
    },

    products: [
      {
        productId: {
          type: String,
          required: true
        },
        name: String,
        price: Number,
        image: String,
        size: String,
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],

    totalPrice: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      default: "Pending" // Pending, Paid, Delivered
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);