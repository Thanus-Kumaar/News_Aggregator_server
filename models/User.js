const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: "" },
    password: { type: String, required: true },
    locations: { type: [String], default: [] },
    sources: { type: [String], default: [] },
    languages: { type: [String], default: [] },
    EntertainmentArticlesRead: { type: Number, default: 0 },
    SportsArticlesRead: { type: Number, default: 0 },
    PoliticalArticlesRead: { type: Number, default: 0 },
    BusinessArticlesRead: { type: Number, default: 0 },
    TechnologyArticlesRead: { type: Number, default: 0 },
    GlobalArticlesRead: { type: Number, default: 0 },
  },
  { strict: false }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
