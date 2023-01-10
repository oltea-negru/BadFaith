const { createClient } = require('redis')
const { createAdapter } = require('@socket.io/redis-adapter');
const { default: HotStorageClient } = require('./redisClient');

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

function generateLobbyCode() {
  let codeLength = 5
  let lobbyCode = generateRandomString(codeLength)
  let retryCount = 0
  while (gameStoreClient.doesLobbyExist(lobbyCode)) {
    if (retryCount == 5) {
      codeLength++
      retryCount = 0
    }
    lobbyCode = generateLobbyCode(codeLength)
  }

  return lobbyCode
}

function generateRandomString(length) {
  const validCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
  const output = '';
  for (let i = 0; i < length; i++) {
    output += validCharacters.charAt(Math.floor(Math.random() * validCharacters.length));
  }
  return output;
}

async function createLobby(lobbyCode, hostDetails) {
  const createResult = await gameStoreClient.createLobby(lobbyCode)
  const joinResult = await gameStoreClient.joinLobby(lobbyCode, hostDetails)
}

async function joinLobby(lobbyCode, playerDetails) {
  const result = await gameStoreClient.joinLobby(lobbyCode, playerDetails)
  return result
}

async function readyUp(lobbyCode, socket) {
  const result = await gameStoreClient.addReady(lobbyCode, socket, true)
  return result
}

async function addVote(lobbyCode, target) {
  const result = await gameStoreClient.addVote(lobbyCode,target)
}

async function progressGameState(lobbyCode) {
  await gameStoreClient.progressGameState(lobbyCode)
}
io.on('connection', async (socket) => {

  console.log(`Socket ${socket.id} connected.`)

  socket.on('createLobby', async (hostDetails, callback) => {
    const lobbyCode = generateLobbyCode()
    await createLobby(lobbyCode, hostDetails)
    callback({
      lobbyCode
    })
  })

  socket.on('joinLobby', async (lobbyCode, playerDetails) => {
    await joinLobby(lobbyCode, playerDetails)
  })

  socket.on('readyUp', async (lobbyCode) => {
    await readyUp(lobbyCode,socket)
  })

  socket.on('action', () => {

  })

  socket.on('vote', async (lobbyCode,target) => {
    await addVote(lobbyCode,target)
  })

  socket.on('chat', message => {
    // 1. Add socket to room
    // 2. Add the player to an array of players associated with the room name in redis
  })

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected.`);
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