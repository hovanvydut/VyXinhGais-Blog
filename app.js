require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash-plus');
const logger = require('morgan');

const app = express();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const indexRouter = require('./routes/admin/index.route');
const accountsRouter = require('./routes/admin/accounts.route');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// express mysql session
const options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    checkExpirationInterval: 10 * 60 * 1000,
    expiration: 30 * 60 * 1000,
};
const sessionStore = new MySQLStore(options);

app.use(
    session({
        key: process.env.SESSION_COOKIE_NAME,
        secret: process.env.SESSION_COOKIE_SECRET,
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));
app.use('/static', express.static(path.join(`${__dirname}`, 'public')));
app.use(
    methodOverride((req, res) => {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            const method = req.body._method;
            delete req.body._method;
            return method;
        }
    })
);
app.use(logger('dev'));

app.use('/admin', indexRouter);
app.use('/admin/accounts', accountsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('admin/pages/error');
});

module.exports = app;
