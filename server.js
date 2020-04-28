const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
var db = mongoose.connection;

// Added check for DB connection
if (!db)
  console.log("Error connecting db")
else
  console.log("Db connected successfully")

const app = express();
const routes = require('./api/routes');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTION, DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, x-access-token, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

// Start the app by listening on the default Heroku port
app.listen(port, function () {
  console.log('App is running at localhost:' + port);
  console.log('Press CTRL-C to stop\n');
});

module.exports = app;
