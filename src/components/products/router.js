const express = require("express");

const productsController = require("./controller");
const { upload } = require("@middlewares/upload-engine/multer");
const imageProccessing = require("@middlewares/imageProccessing");

const frontRouter = express.Router();
const adminRouter = express.Router();

//admin
adminRouter.get("/", productsController.products);
adminRouter.get("/:id", productsController.product);
adminRouter.post(
  "/create",
  upload([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery", maxCount: 5 },
  ]),
  imageProccessing,
  productsController.create
);

adminRouter.put(
  "/:id/edit",
  upload([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery", maxCount: 5 },
  ]),
  imageProccessing,
  productsController.edit
);

adminRouter.delete("/:id", productsController.delete);

//front
frontRouter.get("/", productsController.products);
frontRouter.get("/:id", productsController.product);

module.exports = {
  frontRouter,
  adminRouter,
};
