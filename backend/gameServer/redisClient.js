const bluebird = require('bluebird');
const redis = require('redis');

bluebird.promisifyAll(redis);

const redisHost = process.env.REDIS_HOST || 'localhost'
const redisPort = process.env.REDIS_PORT || '6379'
const client = redis.createClient({ url: `redis://${redisHost}:${redisPort}`})

async function connect() {
    await client.connect()
    console.log('Connected Redis?')
}

module.exports = {
    client, 
    connect
}
