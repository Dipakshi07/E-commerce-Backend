import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
      lowercase: true, // ✅ IMPORTANT (auto "Men" → "men")
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    sizes: {
      type: [String],
      default: ["Free"],
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    material: {
      type: String,
      default: "",
    },

    features: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // ✅ createdAt & updatedAt
  }
);

export default mongoose.model("Product", productSchema);