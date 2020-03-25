const optionOfExpressMysqlSession = () => ({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    checkExpirationInterval: 10 * 60 * 1000,
    expiration: 30 * 60 * 1000,
});

const optionOfExpressSession = (sessionStore) => ({
    key: process.env.SESSION_COOKIE_NAME,
    secret: process.env.SESSION_COOKIE_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
});

module.exports = {
    optionOfExpressMysqlSession,
    optionOfExpressSession,
};
