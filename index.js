import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "https://shop-ease-front-8tkg.vercel.app/"
}));

// ✅ DEBUG ROOT ROUTE
app.get("/", (req, res) => {
  res.send("🚀 Server is running");
});


// ✅ ROUTES
app.use("/api/products", productRoutes);  // 👈 IMPORTANT
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// ❌ HANDLE 404 (VERY IMPORTANT)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found ❌" });
});

// ❌ GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ DB CONNECTION
mongoose.connect(process.env.MONGO_URI, {
  dbName: "E-commerce",
})
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("❌ DB ERROR:", err));

// ✅ SERVER
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
