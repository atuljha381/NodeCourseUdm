const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config({ path: "./Config/config.env" });

const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");

//Connect to DB
mongoose.connect(process.env.MONGO_URI);

//Read JSON Files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

//Import to DB
const importData = async () => {
  //   Promise.resolve(await Bootcamp.create(bootcamps)).catch(next);
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//Delete Data
const deleteData = async () => {
  //   Promise.resolve(await Bootcamp.create(bootcamps)).catch(next);
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
