const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true, allowNull: false },
  password: { type: String, min: 8 },
});

module.exports = mongoose.model("User", UserSchema);
