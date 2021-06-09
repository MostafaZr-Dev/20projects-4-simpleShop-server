const multer = require("multer");

const StorageManager = require("./storages/StorageManager");
const options = require("./options");

const storage = new StorageManager({
  configs: options,
}).get(options.storage);

const fileFilter = (req, file, cb) => {
  if (!options.allowedFormats.includes(file.mimetype)) {
    return cb(
      new multer.MulterError(
        "IMAGE_TYPE_ERROR",
        "Invalid file type. Only jpg and png  image files are allowed."
      )
    );
  }

  cb(null, true);
};

const uploadFile = (fields) => {
  return multer({ storage, fileFilter, limits: { files: 6 } }).fields(fields);
};

exports.upload = (fields) => (req, res, next) => {
  const uploadEngine = uploadFile(fields);

  uploadEngine(req, res, function (error) {
    if (error) {
      return next(error);
    }

    next();
  });
};
