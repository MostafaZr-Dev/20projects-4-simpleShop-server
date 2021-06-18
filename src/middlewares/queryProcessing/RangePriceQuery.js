module.exports = (query) => {
  const { price, filters } = query;

  if (price) {
    const newFilters = {
      ...filters,
      productQuery: {
        ...filters.productQuery,
        price: {
          ...(price.min && { $gte: parseInt(price.min) }),
          ...(price.max && { $lte: parseInt(price.max) }),
        },
      },
    };

    query = {
      ...query,
      filters: newFilters,
    };
  }

  return query;
};
