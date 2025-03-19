const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema(
  {
    type: { type: String },
    feedback: { type: String },
    rating: { type: Number, required: true },
  },
  { strict: false }
);

const Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback;