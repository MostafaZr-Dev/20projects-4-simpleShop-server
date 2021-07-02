const redisService = require("@services/redisService");

exports.addToCart = async (token, item) => {
  const cart = await redisService.getItems(`cart:${token}`);

  if (cart) {
    const product = cart.filter((cartItem) => cartItem.id === item.id).pop();

    let newCart = [];

    if (product) {
      newCart = cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          cartItem.quantity = cartItem.quantity + 1;
        }

        return cartItem;
      });
    } else {
      newCart = [
        ...cart,
        {
          id: item.id,
          quantity: item.quantity,
        },
      ];
    }

    await redisService.setItem(`cart:${token}`, JSON.stringify(newCart));

    return {
      success: true,
    };
  } else {
    await redisService.setItem(
      `cart:${token}`,
      JSON.stringify([
        {
          id: item.id,
          quantity: item.quantity,
        },
      ])
    );

    return {
      success: true,
    };
  }
};

exports.getItems = async (token) => {
  return await redisService.getItems(`cart:${token}`);
};

exports.updateItemQuantity = async (token, itemID, quantity) => {
  const cart = await redisService.getItems(`cart:${token}`);

  const newCart = cart.map((cartItem) => {
    if (cartItem.id === itemID) {
      cartItem.quantity = quantity;
    }

    return cartItem;
  });

  await redisService.setItem(`cart:${token}`, JSON.stringify(newCart));

  return newCart;
};

exports.deleteItem = async (token, itemID) => {
  const cart = await redisService.getItems(`cart:${token}`);

  const newCart = cart.filter((item) => item.id !== itemID);

  await redisService.setItem(`cart:${token}`, JSON.stringify(newCart));

  return newCart;
};

exports.getSubTotal = (products) => {
  return products.reduce((total, current) => {
    const price =
      current.discountedPrice > 0
        ? current.discountedPrice * current.quantity
        : current.price * current.quantity;

    return total + price;
  }, 0);
};

exports.getTotalQuantity = (products) => {
  return products.reduce((total, current) => total + current.quantity, 0);
};
