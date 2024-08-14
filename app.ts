var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
import express, { Request, Response, NextFunction } from "express";
import { TodoList } from "./model";
import TodoListRouter from './routes/todolist';
import UserRouter from './routes/users';
import loginrouter from './routes/login';
import { expressjwt } from "express-jwt";
import { SECRET_KEY } from "./constant";
import logoutRouter from './routes/logout';
import registerRouter from './routes/register';

const req = require('express/lib/request');
require('./model/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressjwt({ secret: SECRET_KEY, algorithms: ['HS256'] }).unless({path:['/api/login','/api/users/login','/api/register','/api/logout']}));

app.use('/api/TodoLists', TodoListRouter);
app.use('/api/users', UserRouter);
app.use('/api', loginrouter);
app.use('/api', logoutRouter);
app.use('/api', registerRouter);

// catch 404 and forward to error handler
app.use(function(req : Request, res: Response, next: NextFunction) {
  next(createError(404));
});



app.listen('3005', () => {
  console.log('Server is running on http://localhost:3005')
})

module.exports = app;
