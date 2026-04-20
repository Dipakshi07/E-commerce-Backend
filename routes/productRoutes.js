import express from "express";
import {
  getProducts,
  getProductById,
  getDeals,
  seedProducts,
  getProductsByCategory,
} from "../controllers/productController.js";

const router = express.Router();

// ✅ SEED
router.get("/seed", seedProducts);

// ✅ DEALS
router.get("/deals", getDeals);

// ✅ CATEGORY (🔥 MUST BE BEFORE :id)
router.get("/category/:category", getProductsByCategory);

// ✅ ALL PRODUCTS
router.get("/", getProducts);

// ✅ SINGLE PRODUCT (🔥 ALWAYS LAST)
router.get("/:id", getProductById);

export default router;