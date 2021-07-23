const OnlineHandler = require("../onlineHandler");

class OnlinePayment {
  constructor() {
    this.gateway = null;

    this.onlineHandler = new OnlineHandler();
  }

  setGateway(gateway) {
    this.gateway = gateway;
  }

  pay(order) {
    const gateway = this.onlineHandler.getGateway(this.gateway);

    return gateway.paymentRequest({
      amount: order.amount,
      description: `پرداخت بابت سفارش با شماره ${order.id}`,
      reserve: order.reserve,
    });
  }

  verify(payData) {
    const gateway = this.onlineHandler.getGateway(this.gateway);

    return gateway.paymentVerify({
      amount: payData.amount,
      refID: payData.authority,
    });
  }
}

module.exports = OnlinePayment;
