const moment = require("moment");
const momentJalali = require("moment-jalaali");

exports.formatDate = (date) => {
  return moment(date).format("YYYY-MM-DD HH:MM");
};

exports.getPersianDate = (date) => {
  return momentJalali(date).format("jYYYY/jM/jD HH:MM");
};
