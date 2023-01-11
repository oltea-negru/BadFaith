import { io } from "socket.io-client";
import { AddMessage } from "../slices/chatSlice";
import { updatePlayerID, updateLobby, toggleReady, updateVote } from "../slices/gameSlice";

export const gsConnect = () => ({ type: 'GS_CONNECT' });
export const gsConnecting = host => ({ type: 'GS_CONNECTING', host });
export const sendChat = message => ({ type: 'CHAT', message })
export const sendAction = (lobbyCode, actionType, actionDetails) => ({ type: 'ACTION', lobbyCode, actionType, actionDetails })
export const createLobby = hostDetails => ({ type: 'CREATE_LOBBY', hostDetails })
export const joinLobby = (lobbyCode, playerDetails) => ({ type: 'CREATE_LOBBY', lobbyCode, playerDetails})
export const votePlayer = (lobbyCode, target) => ({ type: 'CREATE_LOBBY', lobbyCode, target })
export const readyUp = lobbyCode => ({ type: 'CREATE_LOBBY', lobbyCode })


const gameServerMiddleware = () => {
    let socket = null;

    const onChat = (dispatch, message) => {
        console.log('Chat received: ', message)
        dispatch(AddMessage(message))
    }

    const onGameState = (dispatch,gameState) => {
        console.log('State update received: ', gameState)
        dispatch(updateLobby(gameState))
    }

  return store => next => action => {
    switch (action.type) {
        case 'GS_CONNECT':
            if (socket !== null) 
            console.log('Socket is already open!')
            
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
            //TODO Call this on closing page?
            if (socket !== null) {
                socket.close();
            }
            socket = null;
            console.log('Game Socket closed');
            break;
        case 'CREATE_LOBBY':
            console.log('Create lobby', action.hostDetails);
            socket.emit('createLobby', action.hostDetails, (response) => {
                if (response.ok) {
                    store.dispatch(updatePlayerID(store.user.email))
                }
                //TODO Error messages if server failed to create/join lobby
            })
            break;
        case 'JOIN_LOBBY':
            console.log('Join Lobby', action.lobbyCode, action.playerDetails);
            socket.emit('joinLobby', action.lobbyCode, action.playerDetails, (response) => {
                if (response.ok) {
                    store.dispatch(updatePlayerID(store.user.email))
                }
            })
            break;
        case 'VOTE':
            console.log('Vote Placed', action.target);
            socket.emit('vote', action.target, (response) => {
                if (response.ok) {
                    store.dispatch(updateVote(action.target))
                    //TODO Use updateVote to set vote to "Voting..." while request is happening. When vote is empty, enable vote.
                }
                else {
                    store.dispatch(updateVote(""))
                }
            })
            break;
        case 'READY':
            console.log('Ready Up', action.lobbyCode);
            socket.emit('readyUp', action.lobbyCode, (response) => {
                if(response.ok)
                    store.dispatch(toggleReady(response.isReady))
            })
            break;
        case 'ACTION':
            console.log('Action', action.lobbyCode, action.actionType, action.actionDetails);
            socket.emit('action', action.lobbyCode, action.actionType, action.actionDetails)
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