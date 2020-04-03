const socketIO = require('socket.io');

const io = socketIO();
const socketAPI = {};
// Your socket logic here
socketAPI.io = io;

io.on('connection', (socket) => {
    // console.log('A user connected');

    // Whenever someone disconnects this piece of code executed
    socket.on('disconnect', () => {
        // console.log(socket.id);
        // console.log('A user disconnected');
    });
});

module.exports = socketAPI;
