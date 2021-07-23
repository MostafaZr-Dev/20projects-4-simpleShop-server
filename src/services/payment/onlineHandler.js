const ZarinPalGateWay = require("./gateways/ZarinPalGateWay");

class OnlineHandler {
  constructor() {
    this.gateways = {};
    this.gateways["zarinpal"] = new ZarinPalGateWay();
  }

  getGateway(gateway = "zarinpal") {
    if (!gateway in this.gateways) {
      throw new Error("درگاه وجود ندارد!");
    }

    return this.gateways[gateway];
  }
}

module.exports = OnlineHandler;
