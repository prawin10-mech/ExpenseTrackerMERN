const User = require("../models/users");
const Token = require("../models/token");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendOtp = require("../utils/sendOtp");
const generateJwt = require("../utils/generateJwt");
const sendPassowrdLinkMail = require("../utils/sendPassowrdLinkMail");

exports.postRegisterUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailCheck = await User.findOne({ email });
    if (emailCheck && emailCheck.verified === true) {
      return res.json({
        msg: "Email already exists please try to Login",
        status: false,
      });
    } else if (emailCheck && emailCheck.verified == false) {
      const hash = await bcrypt.hash(password, 10);
      await User.deleteOne({ email });
      const user = new User({
        email,
        password: hash,
        name: "",
        profile: "",
      });
      delete user.password;
      user.otp = await sendOtp(email);
      user.save().then(() => {
        return res.status(200).json({ status: true, user });
      });
    } else {
      const hash = await bcrypt.hash(password, 10);
      await User.deleteOne({ email });
      const user = new User({
        email,
        password: hash,
        name: "",
        profile: "",
      });
      delete user.password;
      user.otp = await sendOtp(email);
      user.save().then(() => {
        return res.status(200).json({ status: true, user });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.verifyUser = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email: email });
  if (user.otp === otp) {
    user.verified = true;
    user.save().then(() => {
      return res.json({ status: true, user });
    });
  } else {
    return res.json({
      status: false,
      user,
      msg: "Incorrect OTP please provide valid OTP",
    });
  }
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

exports.postUpdateProfile = async (req, res) => {
  try {
    const { name, profile } = req.body;
    const email = req.user.email;
    const user = await User.findOne({ email });
    user.name = name;
    user.profile = profile;
    user.save().then(() => {
      res.json({ status: true, msg: "profile updated successfully", user });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.isProfileUpdated = async (req, res) => {
  const email = req.user.email;
  const user = await User.findOne({ email });
  if (user.name === "" && user.profile === "") {
    return res.json({ status: false });
  }
  return res.json({ status: true });
};

exports.getUserDetails = async (req, res) => {
  const email = req.user.email;
  const user = await User.findOne({ email });
  return res.json({ ...user });
};

exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    const token = crypto.randomBytes(32).toString("hex");
    const url = `http://localhost:3001/newPasswordUpdate/${token}/${user.id}`;
    user.isUpdated = false;
    await sendPassowrdLinkMail(url, email);
    user.save().then(() => {
      return res.json({
        status: true,
        msg: "Reset link sent to your mail",
        url,
      });
    });
  } catch (err) {
    return res.json({ status: false, msg: "Please try again later" });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { id, password } = req.body;
    const user = await User.findById(id);
    console.log(user.isUpdated);
    if (user.isUpdated === false) {
      const hash = await bcrypt.hash(password, 10);
      user.password = hash;
      user.isUpdated = true;
      user.save().then(() => {
        return res.json({
          status: true,
          msg: "Password Updated Successfully",
          user,
        });
      });
    } else {
      return res.json({
        status: false,
        msg: "You are not authorized to change the password",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
