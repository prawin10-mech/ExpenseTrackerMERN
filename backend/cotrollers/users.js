const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.postRegisterUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({
        msg: "Email already exists please try to Login",
        status: false,
      });
    } else {
      const hash = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        password: hash,
      });
      delete user.password;
      user.save().then(() => {
        return res.status(200).json({ status: true, user });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const generateJwt = (email) => {
  const token = jwt.sign({ email }, "secret");
  return token;
};

exports.postLoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const resultEmail = email.toLowerCase();
    const user = await User.findOne({ email: resultEmail });
    console.log(user);
    if (!user) {
      return res.json({ status: false, msg: "User Not Found Please Register" });
    }
    if (user) {
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        return res.json({ status: false, msg: "Email or Password is Wrong" });
      }
      if (passwordCheck) {
        const token = generateJwt(email);
        return res.json({
          status: true,
          msg: "User successfully Logged in",
          user,
          token,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
