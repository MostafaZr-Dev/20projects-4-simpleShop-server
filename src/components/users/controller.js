const UnAuthorizeException = require("@exceptions/UnAuthorizeException");
const ServerException = require("@exceptions/ServerException");
const userService = require("./services");
const hashService = require("@services/hashService");
const tokenService = require("@services/tokenService");
const userTransformer = require("./transformer");

exports.authenticate = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const authResult = await userService.authenticate(email, password);

    if (!authResult.success) {
      throw new UnAuthorizeException("Email or Password are incorect!");
    }

    const user = authResult.user;

    const token = tokenService.sign({
      ID: user.userID,
    });

    const userData = userTransformer.getUserData(user);
    console.log({ userData, token });
    res.status(200).send({
      success: true,
      token,
      user: userData,
      message: "Successfully logged in",
    });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    const userID = hashService.generateID();
    const hashedPassword = hashService.hashPassword(password);

    const result = await userService.create({
      userID,
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });

    if (result.error) {
      throw new ServerException("something went wrong! try again...");
    }

    if (!result.success) {
      return res.status(422).send({
        success: false,
        message: "something went wrong! try again...",
      });
    }

    res.status(201).send({
      success: true,
      message: "Successfully register.",
    });
  } catch (error) {
    next(error);
  }
};

exports.check = async (req, res) => {
  const user = await userService.getUser(req.userID);

  if (!user.success) {
    return res.status(422).send({
      success: false,
    });
  }

  const userData = userTransformer.getUserData(user.data);

  res.send({
    success: true,
    user: userData,
  });
};
