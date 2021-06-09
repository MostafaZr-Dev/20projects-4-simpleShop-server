const tokenService = require("@services/tokenService");
const UnAuthorizeException = require("@components/exceptions/UnAuthorizeException");

exports.createOrVerifyCartToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      token = tokenService.sign(
        {},
        {
          expiresIn: "2d",
        }
      );

      req.cartToken = token;

      return next();
    }

    token = token.split(" ")[1];

    const verifyTokenResult = tokenService.verify(token);

    if (!verifyTokenResult.success) {
      throw new UnAuthorizeException("Invalid Token!");
    }

    req.cartToken = token;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.verifyCartToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    
    if (!token) {
      throw new UnAuthorizeException("Invalid Token!");
    }

    token = token.split(" ")[1];

    const verifyTokenResult = tokenService.verify(token);

    if (!verifyTokenResult.success) {
      throw new UnAuthorizeException("Invalid Token!");
    }

    req.cartToken = token;
    next();
  } catch (error) {
    next(error);
  }
};
