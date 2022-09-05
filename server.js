const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const app = express();

app.get("/api/vi/bootcamp", (req, res) => {
  res.status(200).json({ success: true, msg: `Show Bootcamp` });
});

app.get("/api/vi/bootcamp/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Show Bootcamp ${req.params.id}` });
});

app.post("/api/vi/bootcamp", (req, res) => {
  res.status(200).json({ success: true, msg: `Create Bootcamp` });
});

app.put("/api/vi/bootcamp/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Update Bootcamp ${req.params.id}` });
});

app.delete("/api/vi/bootcamp/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete Bootcamp ${req.params.id}` });
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running on ${process.env.NODE_ENV} on port ${PORT}`)
);
