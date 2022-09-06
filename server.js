const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");

//Route Files
const bootcamps = require("./routes/bootcamp");

//Load Env variables
dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(logger);

//Mount Routers
app.use("/api/vi/bootcamp", bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running on ${process.env.NODE_ENV} on port ${PORT}`)
);
