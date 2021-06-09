const cartService = require("./services");
const cartTransformer = require("./transformer");
const productService = require("@components/products/services");

exports.add = async (req, res) => {
  const { product, quantity } = req.body;
  const token = req.cartToken;

  const item = {
    ...product,
    quantity: quantity ? quantity : 1,
  };

  await cartService.addToCart(token, item);

  const cartItems = await cartService.getItems(token);
  const ids = cartItems.map((item) => item.id);

  const { success, products, error } = await productService.findByIds(ids);

  const cart = cartTransformer.transform(cartItems, products);

  res.status(201).send({
    success: true,
    cart,
    cartToken: token,
  });
};

exports.items = async (req, res) => {
  const token = req.cartToken;

  const cartItems = await cartService.getItems(token);

  if (!cartItems) {
    return res.send({
      success: true,
      cart: [],
    });
  }

  const ids = cartItems.map((item) => item.id);

  const { success, products, error } = await productService.findByIds(ids);

  const cart = cartTransformer.transform(cartItems, products);

  res.send({
    success: true,
    cart,
  });
};

exports.update = async (req, res) => {
  const { id, quantity } = req.body;
  const token = req.cartToken;

  const cartItems = await cartService.updateItemQuantity(token, id, quantity);

  const ids = cartItems.map((item) => item.id);

  const { success, products, error } = await productService.findByIds(ids);

  const cart = cartTransformer.transform(cartItems, products);

  res.send({
    success: true,
    cart,
  });
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;

  const token = req.cartToken;

  const cartItems = await cartService.deleteItem(token, id);

  const ids = cartItems.map((item) => item.id);

  const { success, products, error } = await productService.findByIds(ids);

  const cart = cartTransformer.transform(cartItems, products);

  res.send({
    cart,
  });
};
