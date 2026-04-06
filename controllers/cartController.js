import Cart from "../models/Cart.js";

// ADD TO CART
export const addToCart = async (req, res) => {
  const item = await Cart.create(req.body);
  res.json(item);
};

// GET CART
export const getCart = async (req, res) => {
  const items = await Cart.find({ userId: req.params.userId });
  res.json(items);
};

// REMOVE
export const removeFromCart = async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json("Removed");
};