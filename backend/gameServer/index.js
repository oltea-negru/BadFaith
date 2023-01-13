const { createClient } = require('redis')
const { createAdapter } = require('@socket.io/redis-adapter');
const { getUnpackedSettings } = require('http2');
const HotStorageClient = require('./redisClient').HotStorageClient;

const gameStoreClient = new HotStorageClient()
const server = require('http').Server();
const io = require('socket.io')({
    cors: {
        "Access-Control-Allow-Origin": "*",
        methods: ["GET", "POST"]
    }
});

const redisHost = process.env.REDIS_HOST || 'localhost'
const redisPort = process.env.REDIS_PORT || '6379'
const pubClient = createClient({ url: `redis://${redisHost}:${redisPort}` })
const subClient = pubClient.duplicate()

const PORT = process.env.PORT || 9000;
io.attach(server);

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
    io.adapter(createAdapter(pubClient, subClient));
});

// Schema in lobbySchema.json

async function generateLobbyCode() {
    let codeLength = 5
    let lobbyCode = generateRandomString(codeLength)
    let retryCount = 0
    while (await gameStoreClient.doesLobbyExist(lobbyCode)) {
        if (retryCount == 5) {
            codeLength++
            retryCount = 0
        }
        lobbyCode = await generateLobbyCode(codeLength)
    }

    return lobbyCode
}

function generateRandomString(length) {
    const validCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
    let output = '';
    for (let i = 0; i < length; i++) {
        output += validCharacters.charAt(Math.floor(Math.random() * validCharacters.length));
    }
    return output;
}

async function createLobby(lobbyCode, hostDetails) {
    const createResult = await gameStoreClient.createLobby(lobbyCode)
    return await gameStoreClient.joinLobby(lobbyCode, hostDetails)
}

async function joinLobby(lobbyCode, playerDetails) {
    return await gameStoreClient.joinLobby(lobbyCode, playerDetails)
}

async function readyUp(lobbyCode, socket) {
    const result = await gameStoreClient.toggleReady(lobbyCode, socket.id)
    return result
}

async function addVote(lobbyCode, target) {
    const response = await gameStoreClient.addVote(lobbyCode, target)
    if (response.msg == "Progressed")
        updateAll(lobbyCode)
    return response
}

async function emitGameState(lobbyCode, socket) {
    io.to(socket).emit('state', await gameStoreClient.getUserState(lobbyCode, socket.id))
}


async function emitUserState(lobbyCode, socket) {
    console.log('Sending Socket', socket)
    const userState = await gameStoreClient.getPlayer(lobbyCode, socket)
    if (userState.ok) io.to(socket).emit('userState', userState.player)
}

async function updateAll(lobbyCode) {
    //TODO  Refactor to not retrieve lobby each time?
    const sockets = await gameStoreClient.getSockets(lobbyCode)
    console.log('Sockets', sockets)
    for (let i = 0; i < sockets.length; i++) {
        await emitGameState(lobbyCode, sockets[i])
    }
    for (let i = 0; i < sockets.length; i++) {

        await emitUserState(lobbyCode, sockets[i])
    }

}

async function updatePlayerGoal(lobbyCode, playerDetails) {
    console.log('UpdatePlayerGoal', playerDetails)
    const result = await gameStoreClient.updatePlayer(lobbyCode, playerDetails)
}

async function updateLobbyPlayerSocket(lobbyCode, playerID, socket) {
    const result = await gameStoreClient.updateLobbyPlayerSocket(lobbyCode, playerID, socket)
    return result
}

async function getPlayer(lobbyCode, socket) {
    io.to(socket).emit('player', await gameStoreClient.getPlayer(lobbyCode, socket))
    return result
}

async function getPlayerSync(playerID) {
    const result = await gameStoreClient.getSyncPlayerHash(playerID)
    if (result.ok) {
        return result.hash
    } else {
        return null
    }
}

async function setPlayerSync(playerID, hash) {
    const result = await gameStoreClient.syncPlayer(playerID, hash)
    return result
}

io.on('connection', async (socket) => {

    console.log(`Socket ${socket.id} connected.`)
    // Check if playerID hash exists


    socket.on('login', async (playerID, acknowledgement) => {
        let result;
        let inLobby;
        let playerHash = await getPlayerSync(playerID)
        console.log('Player Hash', playerHash)

        if (playerHash == null) {
            playerHash = {}
        }
        
        if(playerHash.socketID != null && playerHash.socketID != "") {
            acknowledgement({ok: false, msg: playerID + " is already logged in"})
        }
        else {
            playerHash.socketID = socket.id
            if(playerHash.lobbyCode != null && playerHash.lobbyCode != "") {
                result = await updateLobbyPlayerSocket(playerID,playerHash.lobbyCode,socket.id)
                if(result.ok) {
                    inLobby = (await setPlayerSync(playerID,playerHash)).inGame
                }
                updateAll(playerHash.lobbyCode)
            } else {
                inLobby = (await setPlayerSync(playerID,playerHash)).inGame
                // updateAll(lobbyCode)
            }
        }

        acknowledgement({ ok: true, inLobby })
    })
    /* if exists {
            if socketID exists -> fuck no go away
            else -> assign new socketID, progress to game -> lobby.players[playerID] -> update socketID
    } else -> create hash, add socketID
    */
    socket.on('createLobby', async (hostDetails, acknowledgement) => {
        const lobbyCode = await generateLobbyCode()
        hostDetails.socketID = socket.id
        const result = await createLobby(lobbyCode, hostDetails)
        socket.join(lobbyCode)
        const callbackObj = result.ok ? { ...result, lobbyCode } : { ...result }
        updateAll(lobbyCode)
        acknowledgement(callbackObj)
    })

    socket.on('joinLobby', async (lobbyCode, playerDetails, acknowledgement) => {
        playerDetails.socketID = socket.id
        const result = await joinLobby(lobbyCode, playerDetails)
        if (result.ok) {
            socket.join(lobbyCode)
            updateAll(lobbyCode)
            const callbackObj = result.ok ? { ...result, lobbyCode } : { ...result }
            acknowledgement(callbackObj)
        }
        else acknowledgement(result)

    })

    socket.on('readyUp', async (lobbyCode, acknowledgement) => {
        const isReady = await readyUp(lobbyCode, socket)
        if (isReady.progressState) {
            updateAll(lobbyCode)
            acknowledgement(isReady)
        }
        else {
            acknowledgement(isReady)
        }
    })

    socket.on('action', async (lobbyCode, type, actionDetails, acknowledgement) => {
        let result;
        console.log('Action', lobbyCode)
        switch (type) {
            case 'vote':
                result = await addVote(lobbyCode, actionDetails)
                break;
            case 'update':
                /*
                actionDetails: {
                    "socketID": "",
                    "role": "",
                    "target": "",
                    "nickname": "",
                    "allegiance": "",
                    "ready": ,
                }
                */
                console.log('UpdateDetails', actionDetails)
                result = await updatePlayerGoal(lobbyCode, actionDetails)
                break;
            case 'progress':
                result = await gameStoreClient.progressGameState(lobbyCode)
            default:
                break;
        }
        acknowledgement(result)
        await updateAll(lobbyCode)
    })

    socket.on('vote', async (lobbyCode, target, acknowledgement) => {
        acknowledgement(await addVote(lobbyCode, target))
    })

    socket.on('chat', async message => {
        console.log('Chat event')
        const lobbyCode = Array.from(socket.rooms.keys())[1]
        const player = (await gameStoreClient.getNickname(lobbyCode, socket.id)).nickname
        socket.to(lobbyCode).emit('chat', { player, message });
    })

    socket.on('disconnect', async () => {
        console.log(`Socket ${socket.id} disconnected.`);
        await gameStoreClient.disconnectPlayerSocket(socket.id)
    });
});


// TODO Function
async function verifyUniqueConn(socket) {
    // Acquire redis lock to make sure multiple connections from same user
}

async function startServer() {
    await gameStoreClient.connect()
    console.log('Redis connect')
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    });
}

if (module === require.main) {
    startServer();
}

module.exports = server;