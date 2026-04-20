import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart
} from "../controllers/cartController.js";

const router = express.Router();

// ✅ ADD TO CART (REST style)
router.post("/", addToCart);

// ✅ GET CART BY USER
router.get("/:userId", getCart);

// ✅ REMOVE ITEM
router.delete("/:id", removeFromCart);

export default router;