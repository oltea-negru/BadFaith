const bluebird = require('bluebird');
const redis = require('redis');
const schema = require('./schema.json')

bluebird.promisifyAll(redis);

const redisHost = process.env.REDIS_HOST || 'localhost'
const redisPort = process.env.REDIS_PORT || '6379'
DEFAULT_EXPIRATIION = 3600

class HotStorageClient {
    constructor() {
        this.client = redis.createClient({ url: `redis://${redisHost}:${redisPort}` })
    }

    async connect() {
        await this.client.connect()
        await this.client.set("players", "{}")
    }

    async createLobby(lobbyCode) {
        const lobbyDoc = schema.lobby
        lobbyDoc.state = 1
        const lobbyExists = await this.getLobby(lobbyCode)
        if (lobbyExists == null) {
            this.client.SETEX(lobbyCode, DEFAULT_EXPIRATIION, JSON.stringify(lobbyDoc))
            return {
                ok: true,
                msg: "Lobby created: " + lobbyCode
            }
        }
        return {
            ok: false,
            msg: "Lobby with code already exists"
        };
    }

    //Attempts to add player to lobby
    async joinLobby(lobbyCode, hostDetails) {
        const lobbyDoc = await this.getLobby(lobbyCode)
        if (lobbyDoc == null) {
            return {
                ok: false,
                msg: "Lobby does not exist"
            }
        }
        await this.setActivePlayer(hostDetails.playerID, hostDetails.socketID, lobbyCode)
        if (!lobbyDoc.players[hostDetails.playerID]) { //if player is not in the game already
            lobbyDoc.players[hostDetails.playerID] = schema.player
            lobbyDoc.players[hostDetails.playerID].nickname = hostDetails.nickname
            lobbyDoc.voteLimit++;
        }

        lobbyDoc.players[hostDetails.playerID].socketID = hostDetails.socketID
        lobbyDoc.socketToPlayers[hostDetails.socketID] = hostDetails.playerID
        lobbyDoc.playerToSockets[hostDetails.playerID] = hostDetails.socketID
        console.log("Lobby " + lobbyCode + ": adding " + hostDetails.playerID + " with " + hostDetails.socketID)
        return this.updateLobby(lobbyCode, lobbyDoc)
    }

    //Check that the lobby exists 
    async doesLobbyExist(lobbyCode) {
        var lobbyDoc = await this.getLobby(lobbyCode)
        return (lobbyDoc != null)
    }

    async addReady(lobbyCode, socket, ready) {
        var lobbyDoc = await this.getLobby(lobbyCode)
        const playerID = lobbyDoc.socketToPlayers[socket]
        if(ready) {
            lobbyDoc.readyUp++
        } else {
            lobbyDoc.readyUp--
        }
        lobbyDoc.players[playerID].ready = ready
        const readyResult = await this.updateLobby(lobbyCode, lobbyDoc)
        const progressResult = await this.progressGameState(lobbyCode)
        if(progressResult.ok)
            return {
                progressState: true
            }
        else
            return readyResult
    }

    async getReadyCounter(lobbyCode) {
        const lobby = await this.getLobby(lobbyCode)
        if (lobby == null) return {
            ok: false,
            msg: "Lobby does not exist"
        };
        return {
            ok: true,
            ready: lobbyDoc.readyUp
        }
    }

    async getActivePlayerNumber(lobbyCode) {
        const lobby = await this.getLobby(lobbyCode)
        if (lobby == null) return {
            ok: false,
            msg: "Lobby does not exist"
        };
        const activePlayers = lobbyDoc.currentEvent.extra_players.length + 1
        return {
            ok: true,
            players: activePlayers
        }
    }

    // TODO Remove inbetweeen state -> add seamless event to event progression
    async progressGameState(lobbyCode) {
        let result
        const lobby = this.getLobby(lobbyCode)
        if (lobby == null) result = {
            ok: false,
            msg: "Lobby does not exist"
        };
        switch (lobby.state) {
            case 1: // Joining to Starting
                // check that number of 'readys' is equal to number of 
                if (lobby.readyUp != Object.keys(lobby.players).length) {
                    result = {
                        ok: false,
                        msg: "Not enough players ready"
                    }
                }
                console.log("Lobby " + lobbyCode + ": progressing to start game phase")
                lobby.state = 2
                await this.updateLobby(lobbyCode, lobby)
                result = { ok: true, msg: "Progressed to starting game" }
            case 2: // Starting to between events
                if (lobby.events.length != Object.keys(lobby.players).length) {
                    // the wrong number of events has been generated
                    result = {
                        ok: false,
                        msg: "Incorrect number of events to progress: " + lobby.events.length
                    }
                }
                for (const [player, data] in lobby.players) {
                    console.log(player + ": " + data.allegiance)
                    if (data.allegiance == "") {
                        //Player has not been allocated a team
                        result = {
                            ok: false,
                            msg: "Player: " + player + " has not been allocated a team"
                        }
                    }
                }
                console.log("Lobby " + lobbyCode + ": progressing to in between events")
                lobby.state = 3
                await this.updateLobby(lobbyCode, lobby)
                result = {
                    ok: true,
                    msg: "Lobby events and players initialised, progressing to between events"
                }
            case 3: // Between events
                if (lobby.events.length == 0) { // no more events, progress to discussion
                    console.log("Lobby " + lobbyCode + ": progressing to discussion phase")
                    lobby.state = 5
                    await this.updateLobby(lobbyCode, lobby)
                    result = {
                        ok: true,
                        msg: "Progressed to discussion"
                    }
                } else { // moving to next event
                    console.log("Lobby " + lobbyCode + ": progressing to next event")
                    if (lobby.currentEvent != null) lobby.eventHistory.add(lobby.currentEvent);
                    lobby.currentEvent = lobby.events.shift()
                    lobby.state = 4
                    await this.updateLobby(lobbyCode, lobby)
                    result = {
                        ok: true,
                        msg: "Progressed to next event"
                    }
                }
            case 4: // In event to inbetween
                //conditions needed
                console.log("Lobby " + lobbyCode + ": progressing to in between events")
                lobby.state = 3
                this.updateLobby(lobbyCode, lobby)
                result = {
                    ok: true,
                    msg: "Current event completed, progressing to between events"
                }
            case 5: // Discussion to voting
                console.log("Lobby " + lobbyCode + ": progressing to voting phase")
                lobby.state = 6
                this.updateLobby(lobbyCode, lobby)
                result = {
                    ok: true,
                    msg: "Discussion phase complete, progressing to voting phase"
                }
            case 6: // Voting to results
                if (lobby.voteLimit != Object.keys(lobby.votes).length) {
                    result = {
                        ok: false,
                        msg: "Not enough players voted"
                    }
                }
                console.log("Lobby " + lobbyCode + ": progressing to results phase")
                lobby.state = 7
                this.updateLobby(lobbyCode, lobby)
                result = {
                    ok: true,
                    msg: "Voting phase complete, progressing to results phase"
                }
            case 7: // Results to Ending Game
                console.log("Lobby " + lobbyCode + ": progressing to end phase")
                lobby.state = 8
                this.updateLobby(lobbyCode, lobby)
                result = {
                    ok: true,
                    msg: "Results phase complete, progressing to end phase"
                }
            case 8: // Starting to Starting
                break;
        }
        return result
    }

    async getUserState(lobbyCode, socket) {
        const lobby = this.getLobby(lobbyCode)
        const playerID = lobby.socketToPlayers[socket]
        delete lobby.events
        delete lobby.votes
        delete lobby.voteLimit
        if (lobby.currentEvent.player == playerID) {
            return lobby
        } else {
            delete lobby.currentEvent.details
            delete lobby.currentEvent.extra_players
            delete lobby.currentEvent.event_function
            delete lobby.currentEvent.event_name

            Object.keys(lobby.players).foreach(player => { //Players should not know the details more than what is needed outside the event
                delete lobby.players[player].socketID
                delete lobby.players[player].allegiance
                delete lobby.players[player].role
                delete lobby.players[player].target
                delete lobby.players[player].ready
            })
            return lobby
        }
    }

    async getUsername(lobbyCode, socket) {
        var lobbyDoc = await this.getLobby(lobbyCode)
        var playerID = lobbyDoc.socketToPlayers[socket]
        return {
            ok: true,
            username: playerID
        }
    }

    async getNickname(lobbyCode, socket) {
        var lobbyDoc = await this.getLobby(lobbyCode)
        var playerID = lobbyDoc.socketToPlayers[socket]
        const nickname = lobbyDoc.players[playerID]
        return {
            ok: true,
            nickname: nickname
        }
    }

    //fetch individual lobby json
    async getLobby(lobbyCode) {
        const lobby = await this.client.get(lobbyCode)
        return JSON.parse(lobby)
    }

    async setLobbyEvents(lobbyCode, eventArray) {
        const lobby = await this.client.get(lobbyCode)
        if (lobby.state != 2) {
            return {
                ok: false,
                msg: "Game State is incorrect for storing events"
            }
        }
        lobby.events = eventArray
        const updateResult = await this.updateLobby(lobbyCode, lobby)
        if (updateResult.ok) {
            return {
                ok: true,
                msg: "Events stored successfully"
            }
        }
    }

    async getActivePlayers() {
        const active = await this.client.get("players")
        return JSON.parse(active)
    }

    async setActivePlayer(playerID, socket, lobbyCode) {
        const players = await this.getActivePlayers()
        players[playerID] = {
            lobbyCode: lobbyCode,
            socket: socket
        }
        await this.client.set("players", JSON.stringify(players))
    }

    async getActivePlayer(playerID) {
        const players = await this.getActivePlayers()
        const player = players[playerID]
        return player
    }

    async removeActivePlayer(playerID) {
        const players = this.getActivePlayers()
        delete players[playerID]
        await this.client.set("players", JSON.stringify(players))
    }

    async addVote(lobbyCode, target) {
        const lobby = await this.client.get(lobbyCode)
        if (!lobby.players[target]) {
            return {
                ok: false,
                msg: "Player does not exist"
            }
        }
        if (lobby.votes[target]) {
            lobby.votes[target]++
        } else {
            lobby.votes[target] = 1
        }
        await this.updateLobby(lobbyCode, lobby)
        return {
            ok: true,
            msg: "Vote added"
        }

    }

    //fetch lobbies redis object UNUSED
    // async getLobbies() {
    //     const lobbies = await this.client.get('lobbies')
    //     if (lobbies !== null) {
    //         return JSON.parse(lobbies)
    //     }
    //     else return null;
    // }

    // update the entry for lobby code
    // if lobby does not exist, do nothing and return false
    // if lobby exists, update and return true
    async updateLobby(lobbyCode, lobbyDoc) {
        const lobby = await this.getLobby(lobbyCode)
        if (lobby == null) return { ok: false, msg: "Lobby does not exist" };
        this.client.SETEX(lobbyCode, DEFAULT_EXPIRATIION, JSON.stringify(lobbyDoc))
        return {
            ok: true,
            msg: "Lobby updated"
        };
    }
}

module.exports.HotStorageClient = HotStorageClient;
