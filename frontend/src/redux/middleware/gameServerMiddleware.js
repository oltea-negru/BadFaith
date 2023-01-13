import { io } from "socket.io-client";
import { player_Login } from "../../api/examplePlayerMethods";
import { AddMessage } from "../slices/chatSlice";
import { updatePlayerID, updatePlayer, updateLobby, toggleReady, updateVote, updateLobbyCode } from "../slices/gameSlice";
import { setLoading, setError, setCredentials } from "../slices/userSlice";

export const gsConnect = () => ({ type: 'GS_CONNECT' });
export const gsConnecting = host => ({ type: 'GS_CONNECTING', host });
export const sendChat = message => ({ type: 'CHAT', message })
export const sendAction = (lobbyCode, actionType, actionDetails) => ({ type: 'ACTION', lobbyCode, actionType, actionDetails })
export const createLobby = hostDetails => ({ type: 'CREATE_LOBBY', hostDetails })
export const joinLobby = (lobbyCode, playerDetails) => ({ type: 'JOIN_LOBBY', lobbyCode, playerDetails })
export const votePlayer = (lobbyCode, target) => ({ type: 'VOTE', lobbyCode, target })
export const readyUp = lobbyCode => ({ type: 'READY', lobbyCode })

export const loginPlayer = (email, password) => ({ type: 'LOGIN', email, password})


const serverHost = "localhost"
const serverPort = "9000"

const gameServerMiddleware = () => {
    let socket = null;

    const onChat = (dispatch, message) => {
        console.log('Chat received: ', message)
        dispatch(AddMessage(message))
    }

    const onGameState = (dispatch, gameState) => {
        console.log('State update received: ', gameState)
        dispatch(updateLobby(gameState))
    }

    const onUserState = (dispatch, userState) => {
        console.log('User State update received: ', userState)
        dispatch(updatePlayer(userState))
    }

    return store => next => action => {
        switch (action.type) {
            case 'GS_CONNECT':
                if (socket !== null) {
                    console.log('Socket is already open!')
                    break;
                }

                // connect to the remote host
                socket = new io(`${serverHost}:${serverPort}`, {
                    transports: ['websocket']
                })

                socket.on('connect', () => {
                    console.log('Connected');
                });

                socket.on('chat', message => {
                    onChat(store.dispatch, message)
                })

                socket.on('state', state => {
                    onGameState(store.dispatch, state)
                })

                socket.on('userState', state => {
                    onUserState(store.dispatch, state)
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
                        store.dispatch(updateLobbyCode(response.lobbyCode))
                        store.dispatch(updatePlayerID(action.hostDetails.playerID))
                        store.dispatch(setLoading(false))
                        //TODO Setup loading and error modals
                    }
                    else {
                        store.dispatch(setError(response.msg))
                        setTimeout(() => {
                            store.dispatch(setError(null))
                        }, 3000)
                    }
                    //TODO Error messages if server failed to create/join lobby
                })
                break;
            case 'JOIN_LOBBY':
                console.log('Join Lobby', action.lobbyCode, action.playerDetails);
                socket.emit('joinLobby', action.lobbyCode, action.playerDetails, (response) => {
                    if (response.ok) {
                        console.log('')
                        store.dispatch(updateLobbyCode(response.lobbyCode))
                        store.dispatch(updatePlayerID(action.playerDetails.playerID))
                    }
                    else {
                        store.dispatch(setError(response.msg))
                        setTimeout(() => {
                            store.dispatch(setError(null))
                        }, 3000)
                    }
                })
                break;
            case 'VOTE':
                console.log('Vote Placed', action.target);
                socket.emit('vote', action.lobbyCode, action.target, (response) => {
                    if (!response.ok) {
                        store.dispatch(updateVote(""))
                        store.dispatch(setError(response.msg))
                        setTimeout(() => {
                            store.dispatch(setError(null))
                        }, 3000)
                    }
                    else {
                        store.dispatch(updateVote(action.target))
                    }
                })
                break;
            case 'READY':
                console.log('Ready Up', action.lobbyCode);
                socket.emit('readyUp', action.lobbyCode, (response) => {
                    if (response.ok)
                        store.dispatch(toggleReady(response.isReady))
                    else {
                        store.dispatch(setError(response.msg))
                        setTimeout(() => {
                            store.dispatch(setError(null))
                        }, 3000)
                    }
                })
                break;
            case 'ACTION':
                console.log('Action', action.lobbyCode, action.actionType, action.actionDetails);
                socket.emit('action', action.lobbyCode, action.actionType, action.actionDetails, (response) => {
                    if (!response.ok) {
                        store.dispatch(setError(response.msg))
                        setTimeout(() => {
                            store.dispatch(setError(null))
                        }, 3000)
                    }
                })
                break;
            case 'CHAT':
                console.log('Chat Socket Emit', action.message);
                socket.emit('chat', action.message)
                break;
            case 'LOGIN':
                if (action.email === '' || action.password === '') return
                console.log('provided action.email: ' + action.email);
                console.log('provided action.password: ' + action.password);
                player_Login(action.email, action.password).then(response => {
                    console.log('response', response)
                    if(response.result){
                        socket.emit('login', action.email, (serverResponse) => {
                            console.log('Server Response', serverResponse)
                            if(serverResponse.ok)
                                store.dispatch(setCredentials({email: action.email, password: action.password}))
                        })    
                    }
                    else{
                        store.dispatch(setError(response.msg))
                        setTimeout(() => {
                            store.dispatch(setError(null))
                        }, 3000)
                    }
                })
                break
            default:
                console.log('Next action:', action);
                return next(action);
        }
    };
};

export default gameServerMiddleware();