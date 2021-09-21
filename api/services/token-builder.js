const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.secret || "shh";

const tokenBuilder = (user) => {
  const payload = {
    subject: user.user_id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };
  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
};

module.exports = tokenBuilder;
