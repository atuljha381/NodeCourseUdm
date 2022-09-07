const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//@desc     Get all bootcamps
//@route    GET api/v1/bootcamps
//@access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.find();
  res
    .status(201)
    .json({ success: true, count: bootcamp.length, data: bootcamp });
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
//@access   Public
exports.createBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

//@desc     Update bootcamp
//@route    PUT api/v1/bootcamps
//@access   Public
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
//@access   Public
exports.deleteBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp)
    return next(new ErrorResponse(`Not Found for Id ${req.params.id}`, 404));
  res.status(201).json({ success: true, data: {} });
});
