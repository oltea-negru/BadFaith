import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { AddMessage } from "../slices/chatSlice";

export const gsConnect = () => ({type: 'GS_CONNECT'});
export const gsConnecting = host => ({ type: 'GS_CONNECTING', host });
export const sendChatAction = message => ({ type: 'CHAT', message})

const gameServerMiddleware = () => {
  let socket = null;

  const onChat = (dispatch, message) => {
      console.log('Chat received: ', message)
      dispatch(AddMessage(message))
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
        socket = new io('localhost:9000', {
          transports: ['websocket']
        })

        socket.on('connect', () => {
          console.log('Connected');
        });
    
        socket.on('chat', message => {
            onChat(store.dispatch, message)
        })

        socket.on('state', state => {
            onGameState()
        })

        socket.on('disconnect', (reason) => {
            //TODO Game socket disconnect
        })

        socket.open()
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
        console.log('Chat Socket Emit', action.message);
        socket.emit('chat', action.message)
        break;
      default:
        console.log('Next action:', action);
        return next(action);
    }
  };
};

export default gameServerMiddleware();