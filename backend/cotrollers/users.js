const User = require("../models/users");
const bcrypt = require("bcrypt");

exports.postUser = async (req, res) => {
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
  } catch (ex) {
    console.log(err);
  }
};
