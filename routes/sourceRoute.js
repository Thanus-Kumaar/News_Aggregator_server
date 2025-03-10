const express = require("express");
const sourceRouter = express.Router();
const User = require("../models/User");

// Add to sources array
sourceRouter.put("/:id/sources", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { sources: { $each: req.body.sources } } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove from sources array
sourceRouter.put("/:id/sources/remove", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { sources: req.body.source } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get sources array
sourceRouter.get("/:id/sources", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user.sources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = sourceRouter;
