const socketUrl = `35.189.71.120:`;

let connectButton;
let disconnectButton;
let socket;
let statusInput;

const connect = () => {
  socket = io(socketUrl + document.getElementById('port').value, {
    transports: ['websocket']
  });

  socket.on('connect', (port) => {
    console.log('Connected');
    statusInput.value = 'Connected';
    connectButton.disabled = true;
    disconnectButton.disabled = false;
  });

  socket.on('chat', message => {
    console.log('Chat received: ', message)
  })

  socket.on('disconnect', (reason) => {
    console.log(`Disconnected: ${reason}`);
    statusInput.value = `Disconnected: ${reason}`;
    connectButton.disabled = false;
    disconnectButton.disabled = true;
  })

  socket.on('id', id => {
    console.log('ID Ping Received:', id)
  })

  socket.open();
};

const chat = () => {
  socket.emit('chat', socket.id)
}

const disconnect = () => {
  socket.disconnect();
}

document.addEventListener('DOMContentLoaded', () => {
  connectButton = document.getElementById('connect');
  chatButton = document.getElementById('chat');
  disconnectButton = document.getElementById('disconnect');
  statusInput = document.getElementById('status');
});