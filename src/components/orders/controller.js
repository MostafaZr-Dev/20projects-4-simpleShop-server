const redisService = require("@services/redisService");
const orderService = require("./services");
const userService = require("../users/services");
const orderTransformer = require("./transformer");

exports.create = async (req, res) => {
  const { userID, cartToken, cart } = req.body;

  const user = await userService.getUser(userID);

  if (!user.success) {
    return res.status(500).send({
      success: false,
      message: "امکان ثبت سفارش وجود ندارد",
    });
  }

  console.log(user.data);
  const orderData = {
    user: user.data._id,
    totalPrice: cart.subTotal,
    products: cart.products,
  };

  const createResult = await orderService.save(orderData);

  if (!createResult.success) {
    return res.status(500).send({
      success: false,
      message: "امکان ثبت سفارش وجود ندارد",
    });
  }

  const cartKey = `cart:${cartToken}`;

  await redisService.reset(cartKey);

  res.send({ success: true });
};

exports.orders = async (req, res) => {
  const { success, orders, error } = await orderService.findAll({});

  if (!success) {
    return res.status(500).send({
      success: false,
    });
  }

  const orderData = orderTransformer.transform(orders);

  res.send({
    success: true,
    orders: orderData,
  });
};

exports.ordersByUserID = async (req, res) => {
  const { uid } = req.params;
  console.log(uid);

  const user = await userService.getUser(uid);

  if (!user.success) {
    return res.status(422).send({
      success: false,
      message: "unauthorized access!",
    });
  }

  const { success, orders, error } = await orderService.findAll({
    user: user.data._id,
  });

  if (!success) {
    return res.status(500).send({
      success: false,
    });
  }

  const orderData = orderTransformer.transform(orders);

  res.send({
    success: true,
    orders: orderData,
  });
};
