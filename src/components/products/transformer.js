const dateService = require("@services/dateService");

exports.getProducts = (products) => {
  return {
    products: products.map((product) => {
      return this.getProduct(product);
    }),
  };
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
    category: {
      id: product.category._id,
      title: product.category.title,
      slug: product.category.slug,
    },
    likes: product.likesCount,
    createdAt: {
      fa: dateService.getPersianDate(product.createdAt),
      en: dateService.formatDate(product.createdAt),
    },
  };
};
