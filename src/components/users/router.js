const { Router } = require("express");

const usersController = require("./controller");
const { validateAuthToken } = require("@middlewares/authValidator");

const router = Router();

router.post("/auth/register", usersController.create);
router.post("/auth", usersController.authenticate);
router.post("/auth/check", validateAuthToken, usersController.check);

module.exports = router;
