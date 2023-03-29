const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");

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

module.exports = sendOtp;
