const express = require("express");
const path = require("path");

const appRouter = require("./router");
const boot = require("./boot");
const mongoConnect = require("./infrastructure/mongoose");
const { redisConnect } = require("./infrastructure/redis");
const errorHandler = require("./middlewares/error-handler");

const app = express();

boot(app);
mongoConnect();
redisConnect();

app.use("/api/v1", appRouter);

errorHandler(app);
const runApplication = (port) => {
  console.log(path.resolve(process.cwd(), "/public/upload/media"));

  app.listen(port, () => {
    console.log(`App is running on port:${port}...`);
  });
};

module.exports = runApplication;
