const express = require("express");

const router = express.Router();
const adminRouter = express.Router();
const ordersController = require("./controller");

router.post("/", ordersController.create);
router.get("/", ordersController.orders);
router.get("/:uid", ordersController.ordersByUserID);

//admin
adminRouter.get("/", ordersController.orders);

module.exports = {
  frontRouter: router,
  adminRouter,
};
