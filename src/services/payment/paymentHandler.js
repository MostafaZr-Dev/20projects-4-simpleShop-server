const OnlinePayment = require("./methods/OnlinePayment");
const CODPayment = require("./methods/CODPayment");

class PaymentHandler {
  constructor() {
    this.methods = {};

    this.methods["online"] = new OnlinePayment();
    this.methods["cod"] = new CODPayment();
  }

  getMethod(method = "online") {
    if (!(method in this.methods)) {
      throw new Error("method does not exist!");
    }

    return this.methods[method];
  }
}

module.exports = PaymentHandler
