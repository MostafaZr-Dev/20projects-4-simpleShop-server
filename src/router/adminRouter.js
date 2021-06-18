const express = require("express");

const {
  adminRouter: productAdminRouter,
} = require("@components/products/router");
const categoryRouter = require("@components/category/router");
const router = express.Router();

router.use("/products", productAdminRouter);
router.use("/category", categoryRouter);

module.exports = router;
