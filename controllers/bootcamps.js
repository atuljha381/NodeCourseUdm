//@desc     Get all bootcamps
//@route    GET api/v1/bootcamps
//@access   Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Show Bootcamps` });
};

//@desc     Get single bootcamp
//@route    GET api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Show Bootcamp ${req.params.id}` });
};

//@desc     create bootcamps
//@route    POST api/v1/bootcamps
//@access   Public
exports.createBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Create Bootcamp` });
};

//@desc     Update bootcamp
//@route    PUT api/v1/bootcamps
//@access   Public
exports.updateBootcamps = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update Bootcamp ${req.params.id}` });
};

//@desc     Delete all bootcamps
//@route    DELETE api/v1/bootcamps
//@access   Public
exports.deleteBootcamps = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete Bootcamp ${req.params.id}` });
};
