module.exports = (query) => {
  const { q, filters } = query;

  if (q) {
    const newFilters = {
      ...filters,
      productQuery: {
        ...filters.productQuery,
        title: {
          $regex: q,
          $options: "i",
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
