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