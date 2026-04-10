import express from "express";
import {
  getProducts,
  getProductById,
  getDeals,
  seedProducts,
  getProductsByCategory
} from "../controllers/productController.js";



const router = express.Router();

router.get("/seed", seedProducts);
router.get("/deals", getDeals);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/products", getProductsByCategory);

export default router; // ✅ IMPORTANT