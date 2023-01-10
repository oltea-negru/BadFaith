const { createClient } = require('redis')
const { createAdapter } = require('@socket.io/redis-adapter');

const { client, connect } = require('./redisClient');
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

// Data held in redis:
// user:**playerID**
//  - Role
//  - Event
//  - Evidence
//  - socketID

// players:**lobbyid** array

// votes:**lobbyid** hash playerID to number of votes 
// (allows get all values at end. not sure about incrementing though, might have to be manual)

// playerToSocket:**lobbyID** -> set field name to be player
// eg: field playerID : value socketID 

// socketToPlayer:**lobbyID** -> set field name to be socket
// eg: field socketID : value playerID

// gameState:**lobbyName** key value pair
// event:**lobbyName** hash with fields
//  - name
//  - desc
//  - evidence (should be a string code that can be processed)
// eventHistory:**lobbyName** array
//  - **eventName**:**playerName**


io.on('connection', async (socket) => {
  
  console.log(`Socket ${socket.id} connected.`)

  socket.on('createLobby', () => {
    
  })

  socket.on('joinLobby', () => {

  })

  socket.on('readyUp', () => {
    
  })

  socket.on('action', () => {
    
  })

  socket.on('vote', () => {
    
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

async function startServer(){
  await connect()
  console.log('Redis connect')
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  });
}

if (module === require.main) {
  startServer();
}

module.exports = server;