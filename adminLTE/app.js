require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash-plus');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sessionStoreConfig = require('./common/session-store.config');
const methodOverrideConfig = require('./common/methodOverride.config');

const apiRouter = require('./routes/api/index');
const indexRouter = require('./routes/admin/index.route');
const accountsRouter = require('./routes/admin/accounts.route');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// session-store: express-session + express-mysql-session
const sessionStore = new MySQLStore(
    sessionStoreConfig.optionOfExpressMysqlSession()
);
app.use(session(sessionStoreConfig.optionOfExpressSession(sessionStore)));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));
app.use('/static', express.static(path.join(`${__dirname}`, 'public')));
app.use(methodOverride(methodOverrideConfig));
app.use(logger('dev'));

// Route
app.use('/api/v1', cors(), apiRouter);
app.use('/admin', indexRouter);
app.use('/admin/accounts', accountsRouter);
app.use('/', (req, res) => {
    res.send('home page');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    const myMessage = req.flash('myMessage');
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('admin/pages/404', {
        myMessage,
    });
});

module.exports = app;
