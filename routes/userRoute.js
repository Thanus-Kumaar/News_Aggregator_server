const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create a new user
router.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json(user);
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
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
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
            { password: req.body.password }, // Hash this in real applications!
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
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
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
