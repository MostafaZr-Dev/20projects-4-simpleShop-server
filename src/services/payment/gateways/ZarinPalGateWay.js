const ZarinpalCheckout = require("zarinpal-checkout");

class ZarinPalGateWay {
  constructor() {
    this.merchantID = `${process.env.ZARIN_MERCHANTID}`;
    this.sandbox = process.env.ZARIN_SANDBOX ? true : false;

    this.zarinpal = ZarinpalCheckout.create(this.merchantID, this.sandbox);
  }

  async paymentRequest(request) {
    const appFrontUrl = process.env.APP_FRONT_URL;

    const requestResult = await this.zarinpal.PaymentRequest({
      Amount: request.amount, // In Tomans
      CallbackURL: `${appFrontUrl}/payment/verify/${request.reserve}`,
      Description: request.description,
    });

    if (requestResult && requestResult.status === 100) {
      return {
        success: true,
        url: requestResult.url,
      };
    }

    return {
      success: false,
    };
  }

  async paymentVerify(request) {
    const verifyResult = await this.zarinpal.PaymentVerification({
      Amount: request.amount, // In Tomans
      Authority: request.refID,
    });
    
    if (verifyResult && verifyResult.status === -21) {
      return {
        success: false,
      };
    }

    return {
      success: true,
      refID: verifyResult.RefID,
    };
  }
}

module.exports = ZarinPalGateWay;
