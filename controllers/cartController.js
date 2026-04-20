import Cart from "../models/Cart.js";

// ✅ ADD TO CART (FIXED with quantity merge)
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, name, price, image, size, quantity } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "Invalid data" });
    }

    // 🔥 check if item already exists
    const existingItem = await Cart.findOne({
      userId,
      productId,
      size,
    });

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();

      return res.json({
        message: "Quantity updated",
        item: existingItem,
      });
    }

    // 🆕 new item
    const item = await Cart.create({
      userId,
      productId,
      name,
      price,
      image,
      size,
      quantity: quantity || 1,
    });

    res.status(201).json({
      message: "Added to cart",
      item,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET CART
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "UserId required" });
    }

    const items = await Cart.find({ userId });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ REMOVE FROM CART (SECURE)
export const removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    await Cart.findByIdAndDelete(cartItemId);

    res.json({ message: "Item removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};