import express from "express";
import {
  getProducts,
  getProductById,
  getDeals,
  seedProducts
} from "../controllers/productController.js";



const router = express.Router();

router.get("/seed", seedProducts);
router.get("/deals", getDeals);
router.get("/", getProducts);
router.get("/:id", getProductById);

export default router; // ✅ IMPORTANT