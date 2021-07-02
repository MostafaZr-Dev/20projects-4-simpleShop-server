const express = require("express");

const {
  adminRouter: productAdminRouter,
} = require("@components/products/router");
const categoryRouter = require("@components/category/router");
const { adminRouter: ordersAdminRouter } = require("@components/orders/router");

const router = express.Router();

router.use("/products", productAdminRouter);
router.use("/orders", ordersAdminRouter);
router.use("/category", categoryRouter);

module.exports = router;
