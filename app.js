var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');
var goalsRouter = require('./routes/goals');

var app = express();

// Import mongoose for MongoDB connection

const mongoose = require('mongoose');
// Connect to MongoDB
mongoose.connect('mongodb+srv://josorio408:xAG4dG4eVZFURvdi@goalsandtasksbd.yugftxm.mongodb.net/?retryWrites=true&w=majority&appName=GoalsAndTasksBD');
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
}
);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
}
);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if(req.headers.authorization && req.headers.authorization === '123'){
    next();
  }else{
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/goals', goalsRouter);




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
