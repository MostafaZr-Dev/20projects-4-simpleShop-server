const fs = require("fs");

exports.delete = (filePath) => {
  fs.unlinkSync(filePath);
};

exports.deleteMany = (filePaths) => {
  filePaths.forEach((filePath) => {
    fs.unlinkSync(filePath);
  });
};
