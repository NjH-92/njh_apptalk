// public/script.js
const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const usernameInput = document.getElementById('username'); // Nouvelle ligne

let username = ''; // Nouvelle variable

// Nouvelle fonction pour définir le nom d'utilisateur
function setUsername() {
  username = usernameInput.value.trim();
  if (username === '') {
    alert('Please enter your name.'); // Afficher une alerte si le nom est vide
    return;
  }
  usernameInput.disabled = true;
  input.disabled = false;
  input.focus();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (username === '') {
    setUsername(); // Appeler la fonction si le nom d'utilisateur n'est pas défini
    return;
  }
  if (input.value) {
    socket.emit('message', `${username}: ${input.value}`); // Envoyer le nom d'utilisateur avec le message
    input.value = '';
  }
});

socket.on('message', (data) => {
  const li = document.createElement('li');
  li.textContent = data;

  // Ajoutez la classe de style appropriée en fonction de l'émetteur du message
  if (data.startsWith(`${username}: `)) {
    li.classList.add('message-outgoing');
  } else {
    li.classList.add('message-incoming');
  }

  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});
