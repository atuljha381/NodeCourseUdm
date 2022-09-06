const dotenv = require("dotenv");
const express = require("express");
const color = require("colors");
const logger = require("./middleware/logger");
const connectDB = require("./Config/db");
const errorHandler = require("./middleware/error");

//Load Env variables
dotenv.config({ path: "./Config/config.env" });

//Connect database
connectDB();

//Route Files
const bootcamps = require("./routes/bootcamp");

const app = express();

//Body Parser
app.use(express.json());

app.use(logger);

//Mount Routers
app.use("/api/v1/bootcamp", bootcamps);

app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(
    `Server running on ${process.env.NODE_ENV} on port ${PORT}`.cyan.bold
      .underline
  )
);

//Handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close server and exit process
  server.close(() => process.exit(1));
});
