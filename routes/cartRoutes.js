import express from "express";
import Cart from "../models/cart.js";

const router = express.Router();

// ✅ ADD TO CART
router.post("/add", async (req, res) => {
  const { userId, productId, name, price, image, size, quantity } = req.body;

  try {
    const existing = await Cart.findOne({ userId, productId, size });

    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      return res.json(existing);
    }

    const newItem = new Cart({
      userId,
      productId,
      name,
      price,
      image,
      size,
      quantity,
    });

    await newItem.save();
    res.json(newItem);

  } catch (err) {
    console.error("Add error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET CART
router.get("/:userId", async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.params.userId });
    res.json(items);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE ITEM
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/update", async (req, res) => {
  const { cartItemId, quantity } = req.body;

  try {
    const item = await Cart.findById(cartItemId);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    item.quantity = quantity;
    await item.save();

    res.json(item);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ IMPORTANT
export default router;