const { MulterError } = require("multer");

module.exports = (error, req, res, next) => {
  if (error instanceof MulterError) {
    console.log("multer error: ", error);
    return res.status(422).send({ success: false });
  }

  next(error);
};
