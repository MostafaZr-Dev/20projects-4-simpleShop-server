module.exports = (error, req, res, next) => {
  console.log(error);
  res.status(error.status).send({
    status: error.status,
    code: error.name,
    message: error.message,
  });
};
