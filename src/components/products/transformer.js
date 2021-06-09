const dateService = require("@services/dateService");

exports.getProducts = (products) => {
  return products.map((product) => {
    return this.getProduct(product);
  });
};

exports.getProduct = (product) => {
  return {
    id: product._id,
    title: product.title,
    thumbnail: product.thumbnailUrl,
    gallery: product.galleryUrls,
    price: product.price,
    discountedPrice: product.discountedPrice,
    count: product.count,
    soldCount: product.soldCount,
    createdAt: {
      fa: dateService.getPersianDate(product.createdAt),
      en: dateService.formatDate(product.createdAt),
    },
  };
};
