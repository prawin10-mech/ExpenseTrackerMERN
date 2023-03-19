const router = require("express").Router();
const userController = require("../cotrollers/users");
const middlerware = require("../middleware/authenticate");

router.post("/register", userController.postRegisterUser);

router.post("/login", userController.postLoginUser);

router.post(
  "/updateProfile",
  middlerware.authenticate,
  userController.postUpdateProfile
);

router.get(
  "/isProfileUpdated",
  middlerware.authenticate,
  userController.isProfileUpdated
);

module.exports = router;
