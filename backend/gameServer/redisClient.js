const bluebird = require('bluebird');
const redis = require('redis');

bluebird.promisifyAll(redis);

const redisHost = process.env.REDIS_HOST || 'localhost'
const redisPort = process.env.REDIS_PORT || '6379'

export default class HotStorageClient {
    constructor() {
        this.client = redis.createClient({ url: `redis://${redisHost}:${redisPort}` })
    }

    async connect() {
        await this.client.connect()
    }

    async createLobbyDocument(lobbyCode) {

    }

    async joinLobby(lobbyCode, hostDetails) {
        var lobbyDoc = await this.fetchLobbyDoc(lobbyCode)

    }

    async playerReady(lobbyCode, playerDetails) {
        //fetchLobbyDocument
        var lobbyDoc = await this.fetchLobbyDoc(lobbyCode)
        lobbyDoc['ready']++;
    }

    async progressGameState(lobbyCode) {
        var lobbyDoc = await this.fetchLobbyDoc(lobbyCode)
    }

    async playerAction(lobbyCode, actionDetails) {
        var lobbyDoc = await this.fetchLobbyDoc(lobbyCode)
        switch(actionDetails['action']){ //considering changing this to just map the input to the doc

        }
    }

    async nextEvent(lobbyCode) {
        var lobbyDoc = await this.fetchLobbyDoc(lobbyCode)
        var event_array = lobbyDoc['events']
        lobbyDoc['currentEvent']= event_array.shift()
        lobbyDoc['events'] = event_array
        
    }

    async doesLobbyExist(lobbyCode) {
        var lobbyDoc = await this.fetchLobbyDoc(lobbyCode)
        return lobbyDoc != null
    }

    async fetchLobbyDoc(lobbyCode) {
        var lobbyDoc
        //Fetch lobby doc associated with lobbycode
        return lobbyDoc
    }

    async updateLobbyDoc(lobbyCode,lobbyDoc)
    {
        
    }
}
