"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const express_1 = __importDefault(require("express"));
const todolist_1 = __importDefault(require("./routes/todolist"));
const users_1 = __importDefault(require("./routes/users"));
const login_1 = __importDefault(require("./routes/login"));
const express_jwt_1 = require("express-jwt");
const constant_1 = require("./constant");
const logout_1 = __importDefault(require("./routes/logout"));
const register_1 = __importDefault(require("./routes/register"));
const req = require('express/lib/request');
require('./model/index');
var app = (0, express_1.default)();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express_1.default.static(path.join(__dirname, 'public')));
app.use((0, express_jwt_1.expressjwt)({ secret: constant_1.SECRET_KEY, algorithms: ['HS256'] }).unless({ path: ['/api/login', '/api/users/login', '/api/register', '/api/logout'] }));
app.use('/api/TodoLists', todolist_1.default);
app.use('/api/users', users_1.default);
app.use('/api', login_1.default);
app.use('/api', logout_1.default);
app.use('/api', register_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
app.listen('3005', () => {
    console.log('Server is running on http://localhost:3005');
});
module.exports = app;
