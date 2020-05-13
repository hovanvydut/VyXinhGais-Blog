const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');

const imageMin = async (req, res, next) => {
    try {
        const path = req.file ? req.file.path : null;
        if (path) {
            await imagemin([path], {
                destination: 'public/uploads',
                plugins: [
                    imageminMozjpeg({
                        quality: 80,
                    }),
                    imageminPngquant({
                        quality: [0.6, 0.8],
                    }),
                ],
            });
        }

        next();
    } catch (err) {
        return next(err.message);
    }
};

module.exports = imageMin;
