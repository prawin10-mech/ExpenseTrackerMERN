const router = require("express").Router();
const userController = require("../cotrollers/users");

router.post("/register", userController.postUser);

module.exports = router;
