const dateService = require("@services/dateService");
const OrderStatus = require("@components/orders/model/orderStatus");

const transformOrderLine = (orderLine) => {
  return orderLine.map((item) => ({
    product: item.product,
    price: item.price,
    quantity: item.quantity,
    createdAt: {
      fa: dateService.getPersianDate(item.createdAt),
      en: dateService.formatDate(item.createdAt),
    },
  }));
};

const transformUser = (user) => {
  return {
    id: user.userID,
    displayName: `${user.firstName}-${user.lastName}`,
  };
};

const orderStatus = (status) => {
  switch (status) {
    case OrderStatus.UNPAID:
      return "پرداخت نشده";
    case OrderStatus.PAID:
      return "پرداخت شده";
    case OrderStatus.CANCELED:
      return "کنسل شده";
    case OrderStatus.REFUNDED:
      return "مرجوع شده";
    case OrderStatus.DELIVERED:
      return "تحویل شده";
    case OrderStatus.POSTED:
      return "ارسال شده";

    default:
      throw new Error("Order Status Invalid!");
  }
};

exports.transform = (orders) => {
  return orders.map((order) => this.getOrder(order));
};

exports.getOrder = (order) => {
  return {
    id: order._id,
    user: transformUser(order.user),
    totalPrice: order.totalPrice,
    status: {
      code: order.status,
      title: orderStatus(order.status),
    },
    orderLine: transformOrderLine(order.orderLine),
    createdAt: {
      fa: dateService.getPersianDate(order.createdAt),
      en: dateService.formatDate(order.createdAt),
    },
    updatedAt: {
      fa: dateService.getPersianDate(order.createdAt),
      en: dateService.formatDate(order.createdAt),
    },
  };
};
