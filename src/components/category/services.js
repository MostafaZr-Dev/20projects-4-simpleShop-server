const { CategoryModel } = require("./model");

exports.save = async (data) => {
  try {
    const result = await CategoryModel.create(data);

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
};

exports.findAll = async () => {
  try {
    const data = await CategoryModel.find().sort({ createdAt: -1 }).exec();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
};
