const bluebird = require('bluebird');
const redis = require('redis');

bluebird.promisifyAll(redis);

const redisHost = process.env.REDIS_HOST
const redisPort = process.env.REDIS_PORT
const client = redis.createClient({ url: `redis://${redisHost}:${redisPort}`})

async function connect() {
    await client.connect()
    console.log('Connected Redis?')
}

module.exports = {
    client, 
    connect
}
