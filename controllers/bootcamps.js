const Bootcamp = require("../models/Bootcamp");

//@desc     Get all bootcamps
//@route    GET api/v1/bootcamps
//@access   Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.find();
    res
      .status(201)
      .json({ success: true, count: bootcamp.length, data: bootcamp });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//@desc     Get single bootcamp
//@route    GET api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) return res.status(400).json({ success: false });

    res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    // res.status(400).json({ success: false });
    next(error);
  }
};

//@desc     create bootcamps
//@route    POST api/v1/bootcamps
//@access   Public
exports.createBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//@desc     Update bootcamp
//@route    PUT api/v1/bootcamps
//@access   Public
exports.updateBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) return res.status(400).json({ success: true });

    res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({ success: true });
  }
};

//@desc     Delete all bootcamps
//@route    DELETE api/v1/bootcamps
//@access   Public
exports.deleteBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) return res.status(400).json({ success: true });

    res.status(201).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: true });
  }
};
