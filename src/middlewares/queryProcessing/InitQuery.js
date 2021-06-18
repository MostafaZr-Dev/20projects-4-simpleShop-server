module.exports = (query) => {
  const productQuery = {};
  const sortQuery = {
    createdAt: "desc",
  };
  const categoryQuery = {};

  query["filters"] = {
    categoryQuery,
    productQuery,
    sortQuery,
  };

  return query;
};
