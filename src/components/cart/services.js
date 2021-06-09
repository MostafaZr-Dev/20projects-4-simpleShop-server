const { promisify } = require("util");

const { redisClient } = require("@infrastructure/redis");

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

exports.addToCart = async (token, item) => {
  const cart = await getAsync(`cart:${token}`);

  const parsedCart = cart ? JSON.parse(cart) : null;

  if (parsedCart) {
    const product = parsedCart
      .filter((cartItem) => cartItem.id === item.id)
      .pop();

    let newCart = [];

    if (product) {
      newCart = parsedCart.map((cartItem) => {
        if (cartItem.id === item.id) {
          cartItem.quantity = cartItem.quantity + 1;
        }

        return {
          id: cartItem.id,
          quantity: cartItem.quantity,
        };
      });
    } else {
      newCart = [
        ...parsedCart,
        {
          id: item.id,
          quantity: item.quantity,
        },
      ];
    }

    await setAsync(`cart:${token}`, JSON.stringify(newCart));

    return {
      success: true,
    };
  } else {
    await setAsync(
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
  const cart = await getAsync(`cart:${token}`);

  return cart ? JSON.parse(cart) : null;
};

exports.updateItemQuantity = async (token, itemID, quantity) => {
  const cart = await getAsync(`cart:${token}`);

  const parsedCart = JSON.parse(cart);

  const newCart = parsedCart.map((cartItem) => {
    if (cartItem.id === itemID) {
      cartItem.quantity = quantity;
    }

    return cartItem;
  });

  await setAsync(`cart:${token}`, JSON.stringify(newCart));

  return newCart;
};

exports.deleteItem = async (token, itemID) => {
  const cart = await getAsync(`cart:${token}`);

  const parsedCart = JSON.parse(cart);

  const newCart = parsedCart.filter((item) => item.id !== itemID);

  await setAsync(`cart:${token}`, JSON.stringify(newCart));

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
