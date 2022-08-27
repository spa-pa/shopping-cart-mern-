//----------Starting point of project---------

//----------Use external modules-----------
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cors = require('cors');
var loggerCmd = require('morgan');
const compression = require("compression");
var moment=require("moment")

require("./configuration/database/database");
//----------Use different  internal modules----------
var usersRouter = require('./routes/authentication/usersRoute');
var productRouter= require('./routes/product/productRoute');
var adminRouter= require('./routes/adminpanel/adminRoute');



var app = express();
app.use(cors());

//---------Use for compress res-----------
app.use(compression())



//----------View engine setup----------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(loggerCmd('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//----------Use for user----------
app.use('/api/user', usersRouter);
app.use('/api',productRouter)
app.use('/admin',adminRouter)

//----------Catch 404 and forward to error handler----------
app.use(function(req, res, next) {
  next(createError(404));
});

// var date1=moment("30-05-1995").format("YYYY-MM-DD");
// console.log("new date",date1)

//----------Error handler----------
app.use(function(err, req, res, next) {
  //----------Set locals, only providing error in development-----------
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //----------Render the error page----------
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
