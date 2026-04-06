import express from "express";
import { createOrder, getUserOrders } from "../controllers/orderController.js";

const router = express.Router();

// ✅ CREATE ORDER
router.post("/", createOrder);

// ✅ GET ORDERS BY USER
router.get("/user/:userId", getUserOrders);

export default router;