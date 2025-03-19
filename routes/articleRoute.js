const express = require("express");
const articleRouter = express.Router();
const Article = require("../models/Article");

// Create a saved article
articleRouter.post("/", async (req, res) => {
  try {
    const { title, link } = req.body;
    const article = new Article({ title, link });
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all saved articles
articleRouter.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific article by ID
articleRouter.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an article by ID
articleRouter.delete("/:id", async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Article not found" });
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clear all saved articles
articleRouter.delete("/", async (req, res) => {
    try {
      await Article.deleteMany({});
      res.json({ message: "All articles deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = articleRouter;
