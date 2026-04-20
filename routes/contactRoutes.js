import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// ✅ POST - Submit contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();
    console.log("📩 Saved Data:", newContact);

    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      data: newContact,
    });

  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// ✅ GET - Fetch all messages
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching data",
    });
  }
});

export default router;