module.exports = (query) => {
  const { category, filters } = query;

  if (category) {
    const newFilters = {
      ...filters,
      categoryQuery: {
        slug: {
          $in: category,
        },
      },
    };

    query = { ...query, filters: newFilters };
  }

  return query;
};
