const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.static('public'));

let messages = [];

io.on('connection', (socket) => {
    console.log('A user connected');

    // Gửi danh sách tin nhắn cho người dùng mới
    socket.emit('chat history', messages);

    // Xử lý tin nhắn mới
    socket.on('chat message', (msg) => {
        messages.push(msg);
        io.emit('chat message', msg); // Gửi tin nhắn đến tất cả người dùng
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
