const { createClient } = require('redis')
const { createAdapter } = require('@socket.io/redis-adapter');
const { updateLobby } = require('../../frontend/src/redux/slices/gameSlice');
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
    const result = await gameStoreClient.addReady(lobbyCode, socket.id, true)
    return result
}

async function addVote(lobbyCode, target) {
    const result = await gameStoreClient.addVote(lobbyCode, target)
}

async function emitGameState(lobbyCode, socket) {
    io.to(socket).emit('state', await gameStoreClient.getUserState(lobbyCode, socket.id))
}

async function updateAll(lobbyCode) {
    for (const socket of await gameStoreClient.getSockets(lobbyCode)) {
        emitGameState(lobbyCode, socket)
    }
}

async function updatePlayer(lobbyCode, playerDetails) {
    const result = await gameStoreClient.updatePlayer(lobbyCode, playerDetails)
}

async function getPlayer(lobbyCode, socket) {
    io.to(socket).emit('player', await gameStoreClient.getPlayer(lobbyCode, socket))
    return result
}

io.on('connection', async (socket) => {

    console.log(`Socket ${socket.id} connected.`)

    socket.on('createLobby', async (hostDetails, acknowledgement) => {
        const lobbyCode = await generateLobbyCode()
        hostDetails.socketID = socket.id
        const result = await createLobby(lobbyCode, hostDetails)
        socket.join(lobbyCode)
        const callbackObj = result.ok ? { ...result, lobbyCode } : { ...result }
        acknowledgement(callbackObj)
    })

    socket.on('joinLobby', async (lobbyCode, playerDetails, acknowledgement) => {
        playerDetails.socketID = socket.id
        const result = await joinLobby(lobbyCode, playerDetails)
        socket.join(lobbyCode)
        acknowledgement(result)
    })

    socket.on('readyUp', async (lobbyCode, acknowledgement) => {
        const result = await readyUp(lobbyCode, socket)
        if (result.progressState) {
            updateAll(lobbyCode);
            acknowledgement(result)
        }
        else
            acknowledgement(result)
    })

    socket.on('action', async (lobbyCode, type, actionDetails, acknowledgement) => {
        switch (type) {
            case 'vote':
                acknowledgement(await addVote(lobbyCode, actionDetails.target))
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
                acknowledgement(await updatePlayer(lobbyCode, actionDetails))
        }
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

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected.`);
        //TODO
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