const ProductModel = require("./model");

exports.save = async (data) => {
  try {
    const result = await ProductModel.create(data);

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

exports.findAll = async (productQuery, categoryQuery, sortQuery) => {
  try {
    let data = await ProductModel.find(productQuery)
      .populate({
        path: "category",
        match: categoryQuery,
      })
      .sort(sortQuery)
      .exec();

    data = data.filter((product) => product.category);

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

exports.findBy = async (key, value) => {
  try {
    const product = await ProductModel.findOne({
      [key]: value,
    }).exec();

    if (!product) {
      return {
        success: true,
        product: null,
      };
    }

    return {
      success: true,
      product,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

exports.findByIds = async (ids) => {
  try {
    const products = await ProductModel.find({
      _id: { $in: ids },
    }).exec();

    if (!products) {
      return {
        success: true,
        products: null,
      };
    }

    return {
      success: true,
      products,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

exports.updateOne = async (where, data) => {
  try {
    const result = await ProductModel.updateOne(where, data);

    if (result.nModified === 1) {
      return {
        success: true,
      };
    }

    return {
      success: false,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
};

exports.deleteOne = async (where) => {
  try {
    const result = await ProductModel.deleteOne(where);

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
