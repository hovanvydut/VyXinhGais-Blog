const path = require('path');
const generateId = require('./generateId');

module.exports = {
    storage: {
        destination(req, file, cb) {
            cb(null, 'public/uploads');
        },
        filename(req, file, cb) {
            console.log(
                `${file.fieldname}${generateId(5)}${Date.now()}${path.extname(
                    file.originalname
                )}`
            );
            cb(
                null,
                `${file.fieldname}${generateId(5)}${Date.now()}${path.extname(
                    file.originalname
                )}`
            );
        },
    },
};
