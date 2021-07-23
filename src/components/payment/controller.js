const methods = require("@config/paymentMethods");

exports.methodsList = (req, res, next) => {
  try {
    res.send({
      success: true,
      methods,
    });
  } catch (error) {
    next(error);
  }
};
