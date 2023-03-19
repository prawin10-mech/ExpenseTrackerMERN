const router = require("express").Router();
const userController = require("../cotrollers/users");
const middlerware = require("../middleware/authenticate");

router.post("/register", userController.postRegisterUser);

router.post("/verifyUser", userController.verifyUser);

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

router.get(
  "/getUserDetails",
  middlerware.authenticate,
  userController.getUserDetails
);

router.post("/forgotPassword", userController.forgotPassword);

// router.post("/generateNewPasswordLink/:id", userController.newPasswordUpdate);

router.post("/updatePassword", userController.updatePassword);

module.exports = router;
