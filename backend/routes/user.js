const router = require("express").Router();
const userController = require("../cotrollers/users");

router.post("/register", userController.postRegisterUser);

router.post("/login", userController.postLoginUser);

module.exports = router;
