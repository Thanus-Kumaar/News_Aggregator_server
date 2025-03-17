const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Feedback = require("../models/Feedback");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check if password matches
    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // If login is successful
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({
      name: name,
      email: email,
      password: password,
    });
    await user.save();
    res.status(201).json({
      message: "Signup successful",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a user by ID
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add feedback
router.put("/:id/feedback", async (req, res) => {
  try {
    const feedback = new Feedback({
      type: req.body.type,
      feedback: req.body.feedback,
      rating: req.body.rating,
    });

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { feedback: feedback },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Increment Article Read Count
router.put("/:id/articles", async (req, res) => {
  try {
    const field = req.body.articleType; // Example: "SportsArticlesRead"
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $inc: { [field]: 1 } }, // Increment by 1
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit user name
router.put("/:id/name", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit user password
router.put("/:id/password", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { password: req.body.password },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit any field (including removal)
router.put("/:id/edit", async (req, res) => {
  try {
    const updates = req.body; // Example: { "name": "New Name", "locations": [] }
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
