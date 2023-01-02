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

const redisHost = process.env.REDIS_HOST
const redisPort = process.env.REDIS_PORT
const pubClient = createClient({ url: `redis://${redisHost}:${redisPort}`})
const subClient = pubClient.duplicate()

const PORT = process.env.PORT || 9000;

io.attach(server);

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));
});

io.on('connection', async (socket) => {
  console.log(`Socket ${socket.id} connected.`);

  await sendRedisPing(socket)

  await getRedisVal(socket)

  socket.on('chat', message => {
    console.log('Chat message:', message)
    socket.broadcast.emit('chat', message)
  })

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected.`);
  });
});



//Testing redis connection/read/write
async function sendRedisPing(socket){
  await client.set(socket.id, 'true')
}

async function getRedisVal(socket){
  const id = await client.get(socket.id)
  socket.emit('id', id)
}


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