const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import routes
const userRoutes = require("./routes/userRoute.js");

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

// test route
app.get("/", (req, res) => {
    res.send("Welcome to Mongoose + Express API");
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
