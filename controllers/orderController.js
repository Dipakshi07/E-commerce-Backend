import Order from "../models/Order.js";

// ✅ CREATE ORDER (called from Payment.jsx)
export const createOrder = async (req, res) => {
  try {
    const { userId, products, totalPrice } = req.body;

    if (!userId || !products || products.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const order = await Order.create({
      userId,
      products,
      totalPrice
    });

    res.status(201).json(order);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET USER ORDERS (for future Orders page)
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};