const nodemailer = require("nodemailer");

const sendPassowrdLinkMail = (url, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "boppepraveen10@gmail.com",
      pass: "lswxukljotprxdjc",
    },
  });
  transporter.sendMail(
    {
      from: "expenseTracker@prawin.com",
      to: email,
      subject: "Your OTP for registration",
      text: `Your Password Reset Link is `,
      html: `<a href="${url}">Link</a> <p>This link will work only one time</p>`,
    },
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    }
  );
};

module.exports = sendPassowrdLinkMail;
