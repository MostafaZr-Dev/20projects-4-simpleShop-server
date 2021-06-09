const EexceptionHandler = require("./ExceptionHandler");
const MulterErrorHandler = require("./MulterErrorHandler");
const NotFoundHandler = require("./NotFoundHandler");

const errorHandler = (app) => {
  app.use(MulterErrorHandler);
  app.use(EexceptionHandler);
  app.use(NotFoundHandler);
};

module.exports = errorHandler;
