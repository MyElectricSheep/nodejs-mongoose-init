require('dotenv').config()
require('./database/client')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var studentsRouter = require('./routes/students');
var coursesRouter = require('./routes/courses');
const authenticationRouter = require('./routes/authentication')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/students', studentsRouter);
app.use('/courses', coursesRouter);
app.use('/auth', authenticationRouter)

module.exports = app;
