const path = require('path');
const generateId = require('./generateId');

module.exports = {
    storage: (URL) => ({
        destination(req, file, cb) {
            cb(null, URL);
        },
        filename(req, file, cb) {
            cb(
                null,
                `${file.fieldname}${generateId(5)}${Date.now()}${path.extname(
                    file.originalname
                )}`
            );
        },
    }),
};
