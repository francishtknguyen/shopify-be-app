const Users = require("../models/auth-model");

const bodyValidation = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({ status: 401, message: "username and password required" });
  } else {
    next();
  }
};

const usernameAvailability = async (req, res, next) => {
  const { username } = req.body;
  const user = await Users.findBy({ username });
  if (!user) {
    next();
  } else {
    next({ status: 409, message: "username taken" });
  }
};
const validateUsername = async (req, res, next) => {
  const { username } = req.body;
  const user = await Users.findBy({ username });
  if (user) {
    req.user = user;
    next();
  } else {
    next({ status: 409, message: "invalid username" });
  }
};
module.exports = {
  bodyValidation,
  usernameAvailability,
  validateUsername,
};
