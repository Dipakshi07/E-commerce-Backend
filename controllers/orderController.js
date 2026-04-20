import Order from "../models/Order.js";

// ✅ CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    let { userId, products, totalPrice } = req.body;

    console.log("📦 Incoming Order:", req.body);

    // ✅ BASIC VALIDATION
    if (!userId || !products || !Array.isArray(products)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data",
      });
    }

    // ✅ FIX PRODUCTS STRUCTURE (AUTO CLEAN)
    const cleanProducts = products
      .map((item) => ({
        productId: item.productId || item._id, // 🔥 FIX
        name: item.name || "Product",
        price: item.price || 0,
        image: item.image || "",
        size: item.size || "Free",
        quantity: item.quantity || 1,
      }))
      .filter((item) => item.productId); // remove invalid

    if (cleanProducts.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid products found",
      });
    }

    // ✅ FIX TOTAL PRICE IF MISSING
    if (!totalPrice) {
      totalPrice = cleanProducts.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    }

    // ✅ CREATE ORDER
    const order = await Order.create({
      userId,
      products: cleanProducts,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });

  } catch (err) {
    console.error("❌ ORDER ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ✅ GET USER ORDERS
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID required",
      });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};