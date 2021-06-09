const express = require("express");

const adminRouter = require("./adminRouter");
const frontRouter = require("./frontRouter");

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/", frontRouter);

module.exports = router;
