const ws = new WebSocket('ws://' + window.location.host);
const chatDiv = document.getElementById('chat');
const messageInput = document.getElementById('messageInput');

// Nhận tin nhắn từ server và hiển thị trong chat
ws.onmessage = (event) => {
    const message = document.createElement('div');
    message.textContent = event.data;
    message.className = 'message';
    chatDiv.appendChild(message);
    chatDiv.scrollTop = chatDiv.scrollHeight; // Cuộn xuống dưới cùng
};

// Gửi tin nhắn khi nhấn phím Enter
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && messageInput.value.trim() !== '') {
        ws.send(messageInput.value);
        messageInput.value = '';
    }
});
