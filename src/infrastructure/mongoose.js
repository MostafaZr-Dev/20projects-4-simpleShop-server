const mongoose = require("mongoose");

const { MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env;

mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

module.exports = () => {
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("mongo is connected...");
  });
};
