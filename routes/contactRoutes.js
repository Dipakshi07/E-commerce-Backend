const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST - Submit contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();
    console.log("Saved Data:", newContact); 

    res.status(201).json({
      message: "Message sent successfully!",
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});

// GET - Fetch all messages (Admin use)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

module.exports = router;