require("dotenv").config();
const express = require("express");
const { connectionDB } = require("./db");
const seatsRoutes = require("./routes/seatsRoutes")
const usersRoutes = require("./routes/usersRoutes")
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

connectionDB();
app.use("/api/booking", seatsRoutes);
app.use("/api/auth", usersRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log("Server is running on: ", port)
});