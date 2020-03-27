class DBError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DATABASE ERROR';
    }
}

class SendMailError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SEND MAIL ERROR';
    }
}

module.exports = {
    DBError,
    SendMailError,
};
