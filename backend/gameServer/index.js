const { createClient } = require('redis')
const { createAdapter } = require('@socket.io/redis-adapter');


const gameStoreClient = new require('./redisClient')();
const server = require('http').Server();
const io = require('socket.io')({
  cors: {
    "Access-Control-Allow-Origin": "*",
    methods: ["GET", "POST"]
  }
});

const redisHost = process.env.REDIS_HOST || 'localhost'
const redisPort = process.env.REDIS_PORT || '6379'
const pubClient = createClient({ url: `redis://${redisHost}:${redisPort}`})
const subClient = pubClient.duplicate()

const PORT = process.env.PORT || 9000;

io.attach(server);

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));
});

// Schema in lobbySchema.json

function generateLobbyCode(){
  let codeLength = 5
  let lobbyCode = generateRandomString(codeLength)
  let retryCount = 0
  while(gameStoreClient.doesLobbyExist(lobbyCode)){
    if(retryCount == 5){
      codeLength++
      retryCount=0
    }
    lobbyCode = generateRandomString(codeLength)
    retryCount++
  }

  return lobbyCode
}

function generateRandomString(length){
  const validCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
  const output = '';
  for (let i=0; i<length; i++) {
      output += validCharacters.charAt(Math.floor(Math.random() * validCharacters.length));
  }
  return output;
}

async function createLobby(lobbyCode, hostDetails){
  await gameStoreClient.createLobbyDocument(lobbyCode)
  await gameStoreClient.joinLobby(lobbyCode, hostDetails)
}

async function joinLobby(lobbyCode, playerDetails){
  await gameStoreClient.joinLobby(lobbyCode, playerDetails)
}

async function awaitHandleReady(lobbyCode){
  //Check the event the game is running if it's not the lobby phase
  //Check who is currently active in said event
  //Make the counter for number of "readys" needed to be that number
  //If that number is reached
      //Progress the game state
      //Update all clients

  await gameStoreClient.addReady(lobbyCode)
  const counterMax = await gameStoreClient.getActivePlayerNumber(lobbyCode)
  const readyCounter = await gameStoreClient.getReadyCounter(lobbyCode)

  if(readyCounter == counterMax){
    await gameStoreClient.progressGameState(lobbyCode)
    await updateAll(lobbyCode)
  }
}

async function updateAll(lobbyCode){
  const sockets = io.sockets.clients(lobbyCode)
  for(const socket of sockets){
    const userState = await gameStoreClient.getUserState(socket)
    socket.emit('state', userState)
  }
}

function getRoom(socket){
  return socket.rooms.values()[0]
}

io.on('connection', async (socket) => {
  
  console.log(`Socket ${socket.id} connected.`)

  socket.on('createLobby', async (hostDetails, callback) => {
    const lobbyCode = generateLobbyCode()
    await createLobby(lobbyCode, hostDetails)
    callback({
      lobbyCode
    })

    socket.join(lobbyCode)
  })

  socket.on('joinLobby', async (lobbyCode, playerDetails) => {
    await joinLobby(lobbyCode, playerDetails)
  })

  socket.on('readyUp', async () => {
    await handleReady()
  })

  socket.on('action', () => {
    
  })

  socket.on('vote', async username => {
    const voter = await gameStoreClient.getUsername(socket)
    await gameStoreClient.votePlayer(username, voter)
  })

  socket.on('chat', async message => {
    const nickname = await gameStoreClient.getNickname(socket)
    const room = getRoom(socket)
    io.to(room).emit(`${nickname}: ${message}`)
  })

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected.`);
  });
});


// TODO Function
async function verifyUniqueConn(socket) {
  // Acquire redis lock to make sure multiple connections from same user
}

async function startServer(){
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