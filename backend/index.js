require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectionDB } = require("./db"); // Ensure this function establishes a database connection
const seatsRoutes = require("./routes/seatsRoutes");
const usersRoutes = require("./routes/usersRoutes");

const app = express();

// Middleware
app.use(cors()); // Always apply CORS before defining routes
app.use(express.json()); // Parse incoming JSON requests

// Database Connection
connectionDB(); // Establish database connection before handling any routes

// Routes
app.use("/api/booking", seatsRoutes);
app.use("/api/auth", usersRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start Server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
