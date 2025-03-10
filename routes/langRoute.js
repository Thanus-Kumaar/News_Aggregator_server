const express = require("express");
const langRouter = express.Router();
const User = require("../models/User");

// Add to languages array
langRouter.put("/:id/languages", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { languages: { $each: req.body.languages } } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove from languages array
langRouter.put("/:id/languages/remove", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { languages: req.body.language } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get languages array
langRouter.get("/:id/languages", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user.languages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = langRouter;
