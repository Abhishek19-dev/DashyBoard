document.addEventListener('DOMContentLoaded', () => {
  const sendButton = document.getElementById('send-btn');
  const inputField = document.getElementById('input');
  const messagesContainer = document.getElementById('messages');

  sendButton.addEventListener('click', () => {
    const message = inputField.value.trim();
    if (message) {
      appendMessage('You', message);
      inputField.value = '';
      handlePredefinedResponses(message);
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

  function handlePredefinedResponses(message) {
    const predefinedResponses = {
      'hello, how are you?': 'Hello, Parth! I am doing well, thank you. How about you? How is your work on the DashyBoard Chrome extension coming along?',
      'explain machine learning': 'Machine learning is a branch of artificial intelligence that enables computers to learn from data and improve their performance over time without being explicitly programmed. It involves training algorithms on large datasets to recognize patterns and make predictions or decisions based on new input data.'
    };

    const response = predefinedResponses[message.toLowerCase()];
    if (response) {
      setTimeout(() => {
        displayResponseLineByLine('Bot', response);
      }, 3000); // 3-second delay
    } else {
      sendMessageToAPI(message);
    }
  }

  function displayResponseLineByLine(sender, message) {
    const lines = message.split('\n');
    let index = 0;

    function appendNextLine() {
      if (index < lines.length) {
        appendMessage(sender, lines[index]);
        index++;
        setTimeout(appendNextLine, 500); // Adjust the delay as needed
      }
    }

    appendNextLine();
  }

  async function sendMessageToAPI(message) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY' // Replace with your API key
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
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
      displayResponseLineByLine('Bot', reply);
    } catch (error) {
      appendMessage('Error', 'Something went wrong: ' + error.message);
    }
  }
});
