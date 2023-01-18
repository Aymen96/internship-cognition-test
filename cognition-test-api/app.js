var express = require('express');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');

var app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  next();
});

app.use(bodyParser.json());

app.use('/', indexRouter);

module.exports = app;
