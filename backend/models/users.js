const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String },
  password: { type: String, min: 8 },
  name: { type: String, min: 3 },
  profile: { type: String },
  otp: { type: String, min: 4 },
  verified: { type: Boolean, default: false },
  isUpdated: { type: Boolean, default: true },
});

module.exports = mongoose.model("User", UserSchema);
