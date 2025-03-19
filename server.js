const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Import routes
const userRoutes = require("./routes/userRoute.js");
const locRoutes = require("./routes/locRoute.js");
const langRoutes = require("./routes/langRoute.js");
const sourceRoutes = require("./routes/sourceRoute.js");
const articleRoute = require("./routes/articleRoute.js");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// test route
app.get("/", (req, res) => {
  res.send("Welcome to Mongoose + Express API");
});

app.use("/api/users", userRoutes);
app.use("/api/users", locRoutes);
app.use("/api/users", langRoutes);
app.use("/api/users", sourceRoutes);
app.use("/api/articles", articleRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
