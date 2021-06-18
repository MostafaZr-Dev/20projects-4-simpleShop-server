const fields = {
  date: "createdAt",
  price: "price",
  sold: "soldCount",
  likes: "likesCount",
};

module.exports = (query) => {
  const { sortby, filters } = query;

  if (sortby) {
    const sortParts = sortby.split("-");
    const sortField = fields[sortParts[0]];
    const sortMethod = sortParts[1];

    const newFilters = {
      ...filters,
      sortQuery: {
        [sortField]: sortMethod,
      },
    };

    query = {
      ...query,
      filters: newFilters,
    };
  }

  return query;
};
