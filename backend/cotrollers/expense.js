const Expense = require("../models/expenses");
const User = require("../models/users");

exports.postNewExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    const userId = req.user.id;

    const expense = new Expense({ userId, amount, description, category });
    expense.save().then(() => {
      res.json({ status: true, user });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const id = req.user.id;
    const expense = await Expense.find({ userId: id });
    res.json({ status: true, expense });
  } catch (err) {
    console.log(err);
  }
};
