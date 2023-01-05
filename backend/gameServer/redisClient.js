const bluebird = require('bluebird');
const redis = require('redis');

bluebird.promisifyAll(redis);

const redisHost = process.env.REDIS_HOST || 'localhost'
const redisPort = process.env.REDIS_PORT || '6379'

export default class HotStorageClient{
    constructor(){
        this.client = redis.createClient({ url: `redis://${redisHost}:${redisPort}`})
    }

    async connect(){
        await this.client.connect()
    }

    async createLobbyDocument(lobbyCode){

    }

    async joinLobby(lobbyCode, hostDetails){

    }

    async doesLobbyExist(lobbyCode){
        
    }

    async addReady(lobbyCode){
        
    }

    async getReadyCounter(lobbyCode){

    }

    async getActivePlayerNumber(lobbyCode){

    }

    async progressGameState(lobbyCode){

    }

    async getUserState(socket){
        
    }

    async getUsername(socket){

    }

    async getNickname(socket){

    }
}
