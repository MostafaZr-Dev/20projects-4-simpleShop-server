const express = require("express");

const {
  frontRouter: productFrontRouter,
} = require("@components/products/router");
const cartRouter = require("@components/cart/router");

const router = express.Router();

router.use("/products", productFrontRouter);
router.use("/cart", cartRouter);

module.exports = router;
