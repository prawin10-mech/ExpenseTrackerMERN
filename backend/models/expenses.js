const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  amount: { type: String, min: 1, required: true },
  description: { type: String, min: 1, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model("Expense", expenseSchema);
