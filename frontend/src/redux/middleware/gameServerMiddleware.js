export let gameSocket;
import { io } from "socket.io-client";

export const gsConnect = host => ({ type: 'GS_CONNECT', host });
export const gsConnecting = host => ({ type: 'GS_CONNECTING', host });

const socketMiddleware = () => {
  let socket = null;

  const onChat = message => {
      //TODO Add chat to redux state and use redux state for chat
      console.log('Chat received: ', message)
  }

  const onGameState = gameState => {
      //TODO Dispatch info to game state
  }

  return store => next => action => {
    switch (action.type) {
      case 'GS_CONNECT':
        if (socket !== null) {
          socket.close();
        }

        // connect to the remote host
        socket = new io.connect(action.host);
    
        gameSocket.on('chat', message => {
            onChat()
        })

        gameSocket.on('state', state => {
            onGameState()
        })

        gameSocket.on('disconnect', (reason) => {
            //TODO Game socket disconnect
        })

        break;
      case 'GS_DISCONNECT':
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        console.log('Game Socket closed');
        break;
      case 'CREATE_LOBBY':
        console.log('Create lobby', action.payload);
        socket.emit('createLobby', action.payload, (response) => {
            if(response.ok){
                //TODO Change redux state to make person go into waiting screen
            }
                
          })
        break;
      case 'JOIN_LOBBY':
        console.log('Join Lobby', action.payload);
        socket.emit('joinLobby', action.payload, (response) => {
            if(response.ok){
                //TODO Change redux state to make person go into waiting screen
            } 
          })
        break;
      case 'VOTE':
        console.log('Vote Placed', action.payload);
        socket.emit('vote', action.payload, (response) => {
            if(response.ok){
                //TODO Change redux state to make person unable to vote anymore
            } 
          })
        break;
      case 'READY':
        console.log('Ready Up', action.payload);
        socket.emit('readyUp', action.payload, (response) => {
            if(response.ok){
                //TODO Change redux state to make "ready" button "unready"
            }
        })
        break;
      case 'ACTION':
        console.log('Action', action.payload);
        socket.emit('action', action.payload)
        break;
      case 'CHAT':
        console.log('Chat', action.payload);
        socket.emit('chat', action.payload)
        break;
      default:
        console.log('Next action:', action);
        return next(action);
    }
  };
};

export default gameServerMiddleware();