const chat = document.getElementById('chat');
const input = document.getElementById('userInput');

function formatBold(text) {
  // Replace **bold** with <strong>bold</strong>
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function appendMessage(sender, text) {
  const div = document.createElement('div');
  div.className = `msg ${sender === 'Anda' ? 'user' : 'asisten'}`;
  div.innerHTML = `
    <div class="label">${sender}</div>
    <div class="bubble">${formatBold(text)}</div>
  `;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  appendMessage('Anda', message);
  input.value = '';

  const response = await fetch('http://localhost:3000/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  appendMessage('Asisten', data.message);
}
