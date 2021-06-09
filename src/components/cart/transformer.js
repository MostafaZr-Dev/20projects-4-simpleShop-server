const cartService = require("./services");

exports.transform = (cartItems, products) => {
  const cartProducts = products.map((product) => {
    const quantity = cartItems
      .filter((item) => item.id === product.id)
      .pop().quantity;

    return {
      id: product._id,
      title: product.title,
      price: product.price,
      discountedPrice: product.discountedPrice,
      count: product.count,
      thumbnail: product.thumbnailUrl,
      quantity,
    };
  });

  const subTotal = cartService.getSubTotal(cartProducts);

  const totalQuantity = cartService.getTotalQuantity(cartProducts);

  return {
    products: cartProducts,
    subTotal,
    totalQuantity,
  };
};
