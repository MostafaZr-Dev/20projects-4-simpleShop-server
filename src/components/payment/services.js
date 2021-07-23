const PaymentHandler = require("@services/payment/paymentHandler");
const PaymentModel = require("./model/payment");
const { generateID } = require("@services/hashService");

exports.getPaymentByReserve = async (reserve) => {
  const payment = await PaymentModel.findOne({
    reserve: reserve,
  });

  return payment;
};

exports.getPaymentByOrderID = async (orderID) => {
  const payment = await PaymentModel.findOne({
    order: orderID,
  });

  return payment;
};

exports.updateOne = async (paymentID, where) => {
  const result = await PaymentModel.updateOne(
    {
      _id: paymentID,
    },
    where
  );

  return result;
};

exports.payOrder = async (payData) => {
  try {
    const payment = await PaymentModel.create({
      order: payData.order,
      method: payData.method,
      gateway: payData.gateway,
      reserve: generateID(),
    });

    const paymentHandler = new PaymentHandler();

    const paymentMethod = paymentHandler.getMethod(payData.method);
    console.log(paymentMethod)
    if (payData.method === "online") {
      paymentMethod.setGateway(payData.gateway);
    }

    return paymentMethod.pay({
      amount: payData.amount,
      id: payData.order,
      reserve: payment.reserve,
    });
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

exports.verifyPayment = async (payData) => {
  try {
    const payment = await PaymentModel.findOne({
      reserve: payData.reserve,
    }).populate("order");

    if (!payment) {
      return {
        success: false,
      };
    }

    const paymentHandler = new PaymentHandler();

    const paymentMethod = paymentHandler.getMethod(payment.method);

    paymentMethod.setGateway(payment.gateway);

    return paymentMethod.verify({
      amount: payment.order.totalPrice,
      authority: payData.authority,
    });
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
