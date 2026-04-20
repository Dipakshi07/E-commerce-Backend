import express from "express";
import { createOrder, getUserOrders } from "../controllers/orderController.js";

const router = express.Router();

// ✅ TEST ROUTE (VERY USEFUL)
router.get("/", (req, res) => {
  res.send("Order API working ✅");
});

// ✅ CREATE ORDER
router.post("/", createOrder);

// ✅ GET ORDERS BY USER
router.get("/user/:userId", getUserOrders);

export default router;