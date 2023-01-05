const bluebird = require('bluebird');
const redis = require('redis');
const lobbyTemplate = require('lobbySchema.json')

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
        var lobbyDoc = lobbyTemplate;
        // map code to lobbyDoc
    }

    async joinLobby(lobbyCode, hostDetails){
        var lobbyDoc = await this.getLobbyDoc(lobbyCode)
        var playerDetails = lobbyTemplate['players']['playerID']
        playerDetails['socket'] = hostDetails['socket']
        playerDetails['nickname'] = hostDetails['nickname']
        lobbyDoc['players'][hostDetails.playerID] = playerDetails
        this.updateLobbyDoc(lobbyCode,lobbyDoc)
    }

    async doesLobbyExist(lobbyCode){
        var lobbyDoc = await this.getLobbyDoc(lobbyCode)
        return lobbyDoc != null
    }

    async addReady(lobbyCode){
        var lobbyDoc = await this.getLobbyDoc(lobbyCode)
        lobbyDoc['readyUp']++
        this.updateLobbyDoc(lobbyCode,lobbyDoc)
    }

    async getReadyCounter(lobbyCode){
        var lobbyDoc = await this.getLobbyDoc(lobbyCode)
        return lobbyDoc['readyUp']
    }

    async getActivePlayerNumber(lobbyCode){
        var lobbyDoc = await this.getLobbyDoc(lobbyCode)
        var activePlayers = lobbyDoc['currentEvent']['extra_players'].size() + 1
    }

    async progressGameState(lobbyCode){
        //this is gonna be a fucker
    }

    async getUserState(lobbyCode,socket){
        //????
    }

    async getUsername(lobbyCode,socket){
        var lobbyDoc = await this.getLobbyDoc(lobbyCode)
        var playerID = lobbyDoc['socketsToPlayers'][socket]
        return playerID
    }

    async getNickname(lobbyCode,socket){
        var lobbyDoc = await this.getLobbyDoc(lobbyCode)
        var playerID = lobbyDoc['socketsToPlayers'][socket]
        var nickname = lobbyDoc['players'][playerID]
        return nickname
    }

    async getLobbyDoc(lobbyCode){
        var lobbyDoc //FetchLobbyDoc
        return lobbyDoc
    }

    async updateLobbyDoc(lobbyCode,lobbyDoc)
    {

    }
}
