var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var salesRouter = require('./routes/saleSearch');
var saledRouter = require('./routes/saleDetail');
var saleoRouter = require('./routes/saleOrder');
var goodbRouter = require('./routes/goodBuy');
var goodoRouter = require('./routes/goodOrder');
var accfRouter = require('./routes/accFinancial');
var accrRouter = require('./routes/accResult');
var accvRouter = require('./routes/accView');
var superuRouter = require('./routes/superUser');
var supergRouter = require('./routes/superGood');
var superfRouter = require('./routes/superFactory');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/saleSearch', salesRouter);
app.use('/saleDetail', saledRouter);
app.use('/saleOrder', saleoRouter);
app.use('/goodBuy', goodbRouter);
app.use('/goodOrder', goodoRouter);
app.use('/accFinancial', accfRouter);
app.use('/accResult', accrRouter);
app.use('/accView', accvRouter);
app.use('/superUser', superuRouter);
app.use('/superGood', supergRouter);
app.use('/superFactory', superfRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var server = app.listen(8081, function () {
  var port = server.address().port;
  console.log("Server started at:" + port);
})
