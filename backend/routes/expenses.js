const router = require("express").Router();
const ExpenseController = require("../cotrollers/expense");
const middleware = require("../middleware/authenticate");

router.post(
  "/addExpense",
  middleware.authenticate,
  ExpenseController.postNewExpense
);

router.get("/expenses", middleware.authenticate, ExpenseController.getExpenses);

module.exports = router;
