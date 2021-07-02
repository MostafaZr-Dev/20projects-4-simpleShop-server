const { promisify } = require("util");

const { redisClient } = require("@infrastructure/redis");

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

exports.getItems = async (key) => {
  const cart = await getAsync(key);

  return cart ? JSON.parse(cart) : null;
};

exports.setItem = async (key, value) => {
  await setAsync(key, value);
};

exports.reset = async (key) => {
  await setAsync(key, JSON.stringify([]));
};
