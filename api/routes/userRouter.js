const router = require("express").Router();
const authController = require("./auth-controller");
const {
  bodyValidation,
  validateUsername,
  usernameAvailability,
} = require("../middleware/auth-middleware");

router.post(
  "/register",
  bodyValidation,
  usernameAvailability,
  authController.register
);

router.post("/login", bodyValidation, validateUsername, authController.login);

module.exports = router;
