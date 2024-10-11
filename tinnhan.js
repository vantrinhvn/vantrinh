const socket = io();

// Lấy các phần tử cần thiết
const form = document.getElementById('form');
const input = document.getElementById('input');
const messagesContainer = document.getElementById('messages');

// Hiển thị tin nhắn khi nhận được
socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messagesContainer.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

// Lấy lịch sử tin nhắn
socket.on('chat history', (messages) => {
    messages.forEach(msg => {
        const item = document.createElement('li');
        item.textContent = msg;
        messagesContainer.appendChild(item);
    });
});

// Gửi tin nhắn khi gửi form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});
