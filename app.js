const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');
const mongoose = require('mongoose');
const indexRoute = require('./routes/index')
const itemRoutes = require('./routes/itemRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const {PORT, DB_CONNECTION} = require('./utils/validateEnv')
const errorHandler = require("./utils/error");

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//handle mongodb
(async () => {
    mongoose.set('strictQuery', true)
    try {
        await mongoose.connect(DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'work',

        })
        console.log('MongoDB connected');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
})().catch(console.dir)

app.use('/', indexRoute)
app.use('/item',itemRoutes);
app.use('/category',categoryRoutes);
app.use(errorHandler)

// catch 404 and forward to error handler
// recant develop by express have less knowledge
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// recant develop by express have less knowledge
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//run the server
app.listen(PORT, () => {
    //   console.log(`${api}/products`)
    console.log(`app listening on port ${PORT}`)
})
module.exports = app;
