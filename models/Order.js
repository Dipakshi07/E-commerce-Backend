import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    products: [
      {
        productId: String,
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