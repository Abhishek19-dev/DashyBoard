document.addEventListener('DOMContentLoaded', () => {
  const sendButton = document.getElementById('send-btn');
  const inputField = document.getElementById('input');
  const messagesContainer = document.getElementById('messages');

  sendButton.addEventListener('click', () => {
    const message = inputField.value.trim();
    if (message) {
      appendMessage('You', message);
      inputField.value = '';
      sendMessageToAPI(message);
    }
  });

  inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendButton.click();
    }
  });

  function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  async function sendMessageToAPI(message) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', { // Updated endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `` // Replace with your API key
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // Use the appropriate model
          messages: [
            { role: 'user', content: message }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices[0].message.content.trim();
      appendMessage('ChatGPT', reply);
    } catch (error) {
      appendMessage('Error', 'Something went wrong: ' + error.message);
    }
  }
});
