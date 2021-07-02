const express = require("express");

const {
  frontRouter: productFrontRouter,
} = require("@components/products/router");
const cartRouter = require("@components/cart/router");
const { frontRouter: ordersRouter } = require("@components/orders/router");
const usersRouter = require("@components/users/router");

const router = express.Router();

router.use("/products", productFrontRouter);
router.use("/cart", cartRouter);
router.use("/orders", ordersRouter);
router.use("/users", usersRouter);

module.exports = router;
