const express = require("express");

const router = express.Router();
const paymentController = require("./controller");

router.get("/methods", paymentController.methodsList);

module.exports = router;
