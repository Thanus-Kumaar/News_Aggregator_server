const express = require("express");
const locRouter = express.Router();
const User = require("../models/User");

// Add to locations array
locRouter.put("/:id/locations", async (req, res) => {
  try {
      const user = await User.findByIdAndUpdate(
          req.params.id,
          { $addToSet: { locations: { $each: req.body.locations } } },
          { new: true }
      );
      res.json(user);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Remove from locations array
locRouter.put("/:id/locations/remove", async (req, res) => {
  try {
      const user = await User.findByIdAndUpdate(
          req.params.id,
          { $pull: { locations: req.body.location } },
          { new: true }
      );
      res.json(user);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Get locations array
locRouter.get("/:id/locations", async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      res.json(user.locations);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = locRouter;
