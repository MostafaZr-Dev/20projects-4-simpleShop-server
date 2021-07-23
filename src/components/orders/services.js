const OrderModel = require("./model/order");
const orderStatus = require("./model/orderStatus");

exports.save = async (data) => {
  try {
    const newOrder = await OrderModel.create({
      user: data.user,
      totalPrice: data.totalPrice,
      orderLine: data.products.map((product) => ({
        product: product.id,
        price: product.price,
        quantity: product.quantity,
      })),
    });

    return {
      success: true,
      order: newOrder,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error,
    };
  }
};

exports.findAll = async (where) => {
  try {
    const list = await OrderModel.find(where)
      .populate("user")
      .populate("orderLine.product")
      .sort({ createdAt: -1 })
      .exec();

    return {
      success: true,
      orders: list,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

exports.completeOrder = async (orderID) => {
  await OrderModel.updateOne(
    {
      _id: orderID,
    },
    {
      status: orderStatus.PAID,
    }
  );
};
