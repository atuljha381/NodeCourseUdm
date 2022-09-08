const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocode");
const { remove } = require("../models/Bootcamp");

//@desc     Get all bootcamps
//@route    GET api/v1/bootcamps
//@access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;
  //Copy req Query
  const reqQuery = { ...req.query };

  //Fields to exclude
  const removeFields = ["select"];

  //Loop over remove fields and remove them from reqQuery
  removeFields.forEach((params) => delete reqQuery[params]);
  // console.log(reqQuery);

  //Create Query String
  let queryStr = JSON.stringify(reqQuery);

  //Check for operators ($gt,$gte,$lte etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  query = Bootcamp.find(JSON.parse(queryStr));

  //Select fields
  if (req.query.select) {
    const field = req.query.select.split(",").join(" ");
    query = query.select(field);
  }

  //Sort Fields
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();
  query = query.skip(startIndex).limit(limit);

  //Execute Query
  const bootcamp = await query;

  //Pagination Result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = { page: page + 1, limit };
  }
  if (startIndex > 0) {
    pagination.prev = { page: page - 1, limit };
  }

  res.status(201).json({
    success: true,
    count: bootcamp.length,
    pagination,
    data: bootcamp,
  });
});

//@desc     Get single bootcamp
//@route    GET api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp)
    return next(new ErrorResponse(`Not Found for Id ${req.params.id}`, 404));

  res.status(201).json({ success: true, data: bootcamp });
});

//@desc     create bootcamps
//@route    POST api/v1/bootcamps
//@access   Private
exports.createBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

//@desc     Update bootcamp
//@route    PUT api/v1/bootcamps
//@access   Private
exports.updateBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp)
    return next(new ErrorResponse(`Not Found for Id ${req.params.id}`, 404));

  res.status(201).json({ success: true, data: bootcamp });
});

//@desc     Delete all bootcamps
//@route    DELETE api/v1/bootcamps
//@access   Private
exports.deleteBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp)
    return next(new ErrorResponse(`Not Found for Id ${req.params.id}`, 404));
  res.status(201).json({ success: true, data: {} });
});

//@desc     Get bootcamps within a radius
//@route    GET api/v1/bootcamps/radius/:zipcode/:distance
//@access   Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
