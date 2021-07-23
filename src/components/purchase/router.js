const express = require("express");

const router = express.Router();
const purchaseController = require("./controller");
const {validateAuthToken} = require("@middlewares/authValidator");

router.use(validateAuthToken);

router.post("/", purchaseController.purchaseOrder);
router.post("/verification", purchaseController.verifyPayment);

module.exports = router;
