import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  name: String,
  price: Number,
  image: String,
  size: String,
  quantity: {
    type: Number,
    default: 1,
  },
});

// ✅ Create model
const Cart = mongoose.model("Cart", cartSchema);

// ✅ VERY IMPORTANT (this fixes your error)
export default Cart;