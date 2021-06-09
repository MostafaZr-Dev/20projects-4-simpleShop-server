const express = require("express");

const controller = require("./controller");
const { createOrVerifyCartToken, verifyCartToken } = require("./middlewares");

const router = express.Router();

router.get("/", verifyCartToken, controller.items);

router.post("/add", createOrVerifyCartToken, controller.add);
router.put("/update", verifyCartToken, controller.update);

router.delete("/:id", verifyCartToken, controller.deleteItem);

module.exports = router;
