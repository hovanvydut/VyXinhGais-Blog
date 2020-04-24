const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');

const imageMin = async (req, res, next) => {
    try {
        const { path } = req.file;
        if (path) {
            await imagemin([path], {
                destination: 'public/uploads',
                plugins: [
                    imageminMozjpeg({
                        quality: 70,
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
