const userService = require("../users/services");
const orderService = require("../orders/services");
const paymentService = require("../payment/services");
const paymentStatus = require("../payment/model/paymentStatus");
const ServerException = require("@exceptions/ServerException");
const redisService = require("@services/redisService");

exports.purchaseOrder = async (req, res, next) => {
  try {
    const { userID } = req;
    const { cart, method, gateway, cartToken } = req.body;

    const user = await userService.getUser(userID);

    if (!user.success) {
      throw new ServerException("امکان ثبت سفارش وجود ندارد");
    }

    const orderData = {
      user: user.data._id,
      totalPrice: cart.subTotal,
      products: cart.products,
    };

    const createOrderResult = await orderService.save(orderData);

    if (!createOrderResult.success) {
      throw new ServerException("امکان ثبت سفارش وجود ندارد");
    }

    const order = createOrderResult.order;

    const paymentRequest = await paymentService.payOrder({
      order: order._id,
      amount: order.totalPrice,
      method: method,
      gateway: gateway,
    });
    
    if (paymentRequest.success && method === "cod") {
      await orderService.completeOrder(order._id);

      await redisService.reset(`cart:${cartToken}`);

      return res.send({
        success: true,
      });
    }

    res.send({
      success: true,
      url: paymentRequest.url,
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyPayment = async (req, res, next) => {
  try {
    const { authority, status, reserve, cartToken } = req.body;

    const verifyResult = await paymentService.verifyPayment({
      authority,
      status,
      reserve,
    });

    const payment = await paymentService.getPaymentByReserve(reserve);

    if (verifyResult.success) {
      await paymentService.updateOne(payment._id, {
        refrence: verifyResult.refID,
        paidAt: new Date(),
        status: paymentStatus.SUCCESS,
      });
      await orderService.completeOrder(payment.order);

      await redisService.reset(`cart:${cartToken}`);

      return res.send(verifyResult);
    }

    await paymentService.updateOne(payment._id, {
      status: paymentStatus.FAILED,
    });

    await redisService.reset(`cart:${cartToken}`);

    res.send({
      success: false,
    });
  } catch (error) {
    next(error);
  }
};
