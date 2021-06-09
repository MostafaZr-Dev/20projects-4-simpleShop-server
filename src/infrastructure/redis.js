const redis = require("redis");
const client = redis.createClient(
  process.env.REDIS_PORT,
  process.env.REDIS_HOST
);

const redisConnect = () => {
  client.on("connect", function () {
    console.log("redis connected...");
  });

  client.on("error", function (error) {
    console.error(error);
  });
};

module.exports = {
  redisConnect,
  redisClient: client,
};
