const socketUrl = `localhost:`;

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

  socket.on('state', state => {
    console.log('Updated state', state);
  })
  
  socket.open();
};

const chat = () => {
  const message = document.getElementById('chat').value
  socket.emit('chat', message)
}

const disconnect = () => {
  socket.disconnect();
}

const createLobby = () => {
  console.log('Create lobby');
  const hostDetails = {
    playerID: document.getElementById('playerID').value,
    nickname: document.getElementById('nickname').value
  }
  socket.emit('createLobby', hostDetails, (response) => {
    console.log('Create lobby response', response)
    document.getElementById('lobbyCode').value = response.lobbyCode
  })
}

const joinLobby = () => {
  console.log('Join lobby');
  const lobbyCode = document.getElementById('lobbyCode').value
  const playerDetails = {
    playerID: document.getElementById('playerID').value,
    nickname: document.getElementById('nickname').value,
  }
  socket.emit('joinLobby', lobbyCode, playerDetails, (response) => {
    console.log('Join lobby response', response)
  })
}

const ready = () => {
  console.log('Ready Up');
  const lobbyCode = document.getElementById('lobbyCode').value
  socket.emit('readyUp', lobbyCode, (response) => {
    console.log('ReadyUp response', response)
  })
}


document.addEventListener('DOMContentLoaded', () => {
  connectButton = document.getElementById('connect');
  disconnectButton = document.getElementById('disconnect');
  statusInput = document.getElementById('status');
});