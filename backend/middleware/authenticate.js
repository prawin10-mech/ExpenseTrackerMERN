const jwt = require("jsonwebtoken");
const User = require("../models/users");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const tokenUser = jwt.verify(token, "secret");
    const email = tokenUser.email.toLowerCase();
    const user = await User.findOne({ email });
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
};
