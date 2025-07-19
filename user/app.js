const express = require("express");
const logger = require('morgan')

require('dotenv').config()

const ErrorHandler = require("./utils/errorHandler");
const { generatedErrors } = require("./middleware/error");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'))

app.use("/", require('./routes/user.routes'));

app.all(/(.*)/, (req, res, next) => {
  next(new ErrorHandler(`Request Url Not Found ${req.url}`, 404));
});
app.use(generatedErrors);

app.listen(port, () => {
  console.log(`user service is running on port ${port}`);
});
