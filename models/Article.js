const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true, index: true },
    // For future implementation - user association
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  },
  { timestamps: true }
);

// Create compound index for user + link to ensure uniqueness per user
ArticleSchema.index({ link: 1, user: 1 }, { unique: true, sparse: true });

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;