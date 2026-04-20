import Product from "../models/Product.js";


// ✅ SEED PRODUCTS
export const seedProducts = async (req, res) => {
  try {
    await Product.deleteMany();

    const products = await Product.insertMany([
      {
        name: "Smart Watch",
        price: 2999,
        category: "deal",
        material: "Metal",
        features: ["Waterproof", "Premium Build"],
        rating: 4.7,
        sizes: ["Free"],
        image: "https://m.media-amazon.com/images/I/61ZjlBOp+rL.jpg",
      },

      // ⚡ ELECTRONICS
      {
        name: "Wireless Headphones",
        price: 1999,
        category: "electronics",
        material: "Plastic",
        features: ["Noise Cancelling", "Bluetooth"],
        rating: 4.5,
        sizes: ["Free"],
        image: "https://m.media-amazon.com/images/I/6107aYfAoHL.jpg",
      },
      {
        name: "Laptop Bag",
        price: 1299,
        category: "electronics",
        material: "Polyester",
        features: ["Water Resistant", "Spacious"],
        rating: 4.1,
        sizes: ["Free"],
        image:
          "https://img.freepik.com/premium-photo/blue-bagpack-isolated-white-background_1120055-225.jpg",
      },

      // 👕 MEN
      {
        name: "Men T-Shirt",
        price: 999,
        category: "men",
        material: "Cotton",
        features: ["Soft Fabric", "Breathable"],
        rating: 4.2,
        sizes: ["S", "M", "L", "XL"],
        image:
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      },
      {
        name: "Men Jeans",
        price: 1499,
        category: "men",
        material: "Denim",
        features: ["Durable", "Comfortable"],
        rating: 4.3,
        sizes: ["32", "34", "36", "38"],
        image:
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
      },

      // 👗 WOMEN
      {
        name: "Women Dress",
        price: 1899,
        category: "women",
        material: "Cotton",
        features: ["Comfortable"],
        rating: 4.4,
        sizes: ["S", "M", "L", "XL"],
        image:
          "https://i5.walmartimages.com/asr/4f0f511a-e097-4d8c-8e2c-977fd6fff53f.jpeg",
      },
      {
        name: "Women Top",
        price: 799,
        category: "women",
        material: "Silk",
        features: ["Elegant"],
        rating: 4.0,
        sizes: ["S", "M", "L", "XL"],
        image:
          "https://m.media-amazon.com/images/I/71OOVTv0ZOL.jpg",
      },

      // 👟 SHOES
      {
        name: "Running Shoes",
        price: 2499,
        category: "shoes",
        material: "Synthetic",
        features: ["Lightweight"],
        rating: 4.2,
        sizes: ["6", "7", "8", "9"],
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      },
    ]);

    res.status(201).json({
      message: "Products seeded successfully ✅",
      count: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ✅ GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.json({
      count: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ✅ GET PRODUCTS BY CATEGORY
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const products = await Product.find({
      category: {
        $regex: new RegExp(`^${category}$`, "i"), // ✅ case-insensitive
      },
    });

    res.json({
      category,
      count: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ✅ GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found ❌" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ✅ GET DEAL PRODUCTS
export const getDeals = async (req, res) => {
  try {
    const deals = await Product.find({
      category: {
        $regex: /^deal$/i,
      },
    });

    res.json({
      count: deals.length,
      deals,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};