const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");

const sendOtp = (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "boppepraveen10@gmail.com",
      pass: "lswxukljotprxdjc",
    },
  });

  const secret = speakeasy.generateSecret({ length: 4 });
  const otp = speakeasy.totp({
    secret: secret.base32,
    encoding: "base32",
  });

  transporter.sendMail(
    {
      from: "expenseTracker@prawin.com",
      to: email,
      subject: "Your OTP for registration",
      text: `Your OTP is ${otp}`,
    },
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    }
  );
  return otp;
};
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
  console.log(user);
  return res.json({ ...user });
};
