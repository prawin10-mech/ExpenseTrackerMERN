const router = require("express").Router();
const ExpenseController = require("../cotrollers/expense");
const middleware = require("../middleware/authenticate");

router.post(
  "/addExpense",
  middleware.authenticate,
  ExpenseController.postNewExpense
);

router.get("/expenses", middleware.authenticate, ExpenseController.getExpenses);

router.post("/deleteExpense", ExpenseController.deleteExpense);

router.post("/editExpense", ExpenseController.editExpense);

module.exports = router;
