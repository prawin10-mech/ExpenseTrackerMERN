const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config();

const userRouter = require("./routes/user");

app.use(userRouter);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server started at ${process.env.PORT}`);
  });
});
