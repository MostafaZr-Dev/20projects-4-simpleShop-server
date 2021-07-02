const UnAuthorizeException = require("@exceptions/UnAuthorizeException");
const tokenService = require("@services/tokenService");

exports.validateAuthToken = async (req, res, next) => {
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
    console.log(verifyTokenResult.data);
    req.userID = verifyTokenResult.data.ID;

    next();
  } catch (error) {
    next(error);
  }
};
