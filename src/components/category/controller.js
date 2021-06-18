const categoryService = require("./services");

exports.save = async (req, res) => {
  const { title, slug } = req.body;

  const { success } = await categoryService.save({ title, slug });

  res.status(201).send({
    success: true,
  });
};

exports.categories = async (req, res) => {
  const { success, data } = await categoryService.findAll();

  res.send({
    success: true,
    categories: data,
  });
};
