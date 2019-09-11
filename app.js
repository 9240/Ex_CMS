const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const md = require('marked');

const indexRouter = require('./routes/index');
const newsRouter = require('./routes/news');
const productRouter = require('./routes/product');
const partnerRouter = require('./routes/partner');
const investorRouter = require('./routes/investor');
const corporateCultureRouter = require('./routes/corporateCulture');
const aboutRouter = require('./routes/about');
const adminRouter = require('./routes/admin');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/product', productRouter);
app.use('/partner', partnerRouter);
app.use('/investor', investorRouter);
app.use('/corporateCulture', corporateCultureRouter);
app.use('/about', aboutRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
