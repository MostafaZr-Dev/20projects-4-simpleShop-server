const express = require("express");

const controller = require("./controller");

const router = express.Router();

router.get("/", controller.categories);
router.post("/create", controller.save);

module.exports = router;
