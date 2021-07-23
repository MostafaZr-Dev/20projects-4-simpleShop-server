const express = require("express");

const {
  frontRouter: productFrontRouter,
} = require("@components/products/router");
const cartRouter = require("@components/cart/router");
const { frontRouter: ordersRouter } = require("@components/orders/router");
const usersRouter = require("@components/users/router");
const paymentRouter = require("@components/payment/router");
const purchaseRouter = require("@components/purchase/router");

const router = express.Router();

router.use("/products", productFrontRouter);
router.use("/cart", cartRouter);
router.use("/orders", ordersRouter);
router.use("/users", usersRouter);
router.use("/payment", paymentRouter);
router.use("/purchase", purchaseRouter);

module.exports = router;
