const UserModel = require("./model");
const hashService = require("@services/hashService");

exports.create = async (data) => {
  try {
    const result = await UserModel.create(data);

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error,
    };
  }
};

exports.authenticate = async (email, password) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return {
      success: false,
    };
  }

  const isValidPassword = hashService.comparePassword(password, user.password);

  if (!isValidPassword) {
    return {
      success: false,
    };
  }

  return {
    success: true,
    user,
  };
};

exports.getUser = async (userID) => {
  try {
    const user = await UserModel.findOne({ userID });

    if (!user) {
      return {
        success: false,
      };
    }

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
