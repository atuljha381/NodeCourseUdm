const express = require("express");
const dotenv = require("dotenv");
const bootcamps = require("./routes/bootcamp");

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use("/api/vi/bootcamp", bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running on ${process.env.NODE_ENV} on port ${PORT}`)
);
