const express = require("express");

const { adminRouter } = require("@components/products/router");

const router = express.Router();

router.use("/products", adminRouter);

module.exports = router;
