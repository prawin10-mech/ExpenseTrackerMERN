const jwt = require("jsonwebtoken");

const generateJwt = (email) => {
  const token = jwt.sign({ email }, "secret");
  return token;
};

module.exports = generateJwt;
