const bluebird = require('bluebird');
const redis = require('redis');
const schema = require('schema.json')

bluebird.promisifyAll(redis);

const redisHost = process.env.REDIS_HOST || 'localhost'
const redisPort = process.env.REDIS_PORT || '6379'
DEFAULT_EXPIRATIION = 3600

export default class HotStorageClient {
    constructor() {
        this.client = redis.createClient({ url: `redis://${redisHost}:${redisPort}` })

    }

    async connect() {
        await this.client.connect()
    }

    async createLobby(lobbyCode) {
        const lobbyDoc = schema.lobby
        lobbyDoc.state = 1
        const lobbyExists = await this.getLobby(lobbyCode)
        if (lobbyExists == null) {
            this.client.setex(lobbyCode, DEFAULT_EXPIRATIION, JSON.stringify(lobbyDoc))
            return {
                result: true,
                msg: "Lobby created: " + lobbyCode
            }
        }
        return {
            result: false,
            msg: "Lobby with code already exists"
        };
    }

    //Attempts to add player to lobby
    async joinLobby(lobbyCode, hostDetails) {
        var lobbyDoc = await this.getLobby(lobbyCode)
        if (lobbyDoc.players[hostDetails.playerID]) {
            return {
                result: false,
                msg: "Player is already in lobby"
            }
        }
        var playerDetails = schema.player
        playerDetails.socketId = hostDetails.socketId
        playerDetails.nickname = hostDetails.nickname
        lobbyDoc.players[hostDetails.playerID] = playerDetails

        lobbyDoc.voteLimit++;

        lobbyDoc.socketToPlayers[hostDetails.socketId] = hostDetails.playerID
        lobbyDoc.playerToSockets[hostDetails.player] = hostDetails.socketId
        console.log("Lobby " + lobbyCodeAdding + ": " + hostDetails.playerID)
        return this.updateLobby(lobbyCode, lobbyDoc)
    }

    //Check that the lobby exists 
    async doesLobbyExist(lobbyCode) {
        var lobbyDoc = await this.getLobby(lobbyCode)
        return lobbyDoc != null
    }

    async addReady(lobbyCode, socket, ready) {
        var lobbyDoc = await this.getLobby(lobbyCode)
        lobbyDoc.readyUp++
        const playerID = lobbyDoc.socketToPlayers[socket]
        lobbyDoc.players[playerID].ready = ready
        return this.updateLobby(lobbyCode, lobbyDoc)
    }

    async getReadyCounter(lobbyCode) {
        const lobby = await this.getLobby(lobbyCode)
        if (lobby == null) return {
            result: false,
            msg: "Lobby does not exist"
        };
        return {
            result: true,
            ready: lobbyDoc.readyUp
        }
    }

    async getActivePlayerNumber(lobbyCode) {
        const lobby = await this.getLobby(lobbyCode)
        if (lobby == null) return {
            result: false,
            msg: "Lobby does not exist"
        };
        const activePlayers = lobbyDoc.currentEvent.extra_players.length + 1
        return {
            result: true,
            players: activePlayers
        }
    }

    async progressGameState(lobbyCode) {
        const lobby = this.getLobby(lobbyCode)
        if (lobby == null) return {
            result: false,
            msg: "Lobby does not exist"
        };
        switch (lobby.state) {
            case 1: // Joining to Starting
                // check that number of 'readys' is equal to number of 
                if (lobby.readyUp != Object.keys(lobby.players).length) {
                    return {
                        result: false,
                        msg: "Not enough players ready"
                    }
                }
                console.log("Lobby " + lobbyCode + ": progressing to start game phase")
                lobby.state = 2
                await this.updateLobby(lobbyCode, lobby)
                return { result: true, msg: "Progressed to starting game" }
            case 2: // Starting to between events
                if (lobby.events.length != Object.keys(lobby.players).length) {
                    // the wrong number of events has been generated
                    return {
                        result: false,
                        msg: "Incorrect number of events to progress: " + lobby.events.length
                    }
                }
                for ((player, data) in lobby.players) {
                    console.log(player + ": " + data.allegiance)
                    if (data.allegiance == "") {
                        //Player has not been allocated a team
                        return {
                            result: false,
                            msg: "Player: " + player + " has not been allocated a team"
                        }
                    }
                }
                console.log("Lobby " + lobbyCode + ": progressing to in between events")
                lobby.state = 3
                await this.updateLobby(lobbyCode, lobby)
                return {
                    result: true,
                    msg: "Lobby events and players initialised, progressing to between events"
                }
            case 3: // Between events
                if (lobby.events.length == 0) { // no more events, progress to discussion
                    console.log("Lobby " + lobbyCode + ": progressing to discussion phase")
                    lobby.state = 5
                    await this.updateLobby(lobbyCode, lobby)
                    return {
                        result: true,
                        msg: "Progressed to discussion"
                    }
                } else { // moving to next event
                    console.log("Lobby " + lobbyCode + ": progressing to next event")
                    if (lobby.currentEvent != null) lobby.eventHistory.add(lobby.currentEvent);
                    lobby.currentEvent = lobby.events.shift()
                    lobby.state = 4
                    await this.updateLobby(lobbyCode, lobby)
                    return {
                        result: true,
                        msg: "Progressed to next event"
                    }
                }
            case 4: // In event to inbetween
                //conditions needed
                console.log("Lobby " + lobbyCode + ": progressing to in between events")
                lobby.state = 3
                this.updateLobby(lobbyCode, lobby)
                return {
                    result: true,
                    msg: "Current event completed, progressing to between events"
                }
            case 5: // Discussion to voting
                console.log("Lobby " + lobbyCode + ": progressing to voting phase")
                lobby.state = 6
                this.updateLobby(lobbyCode, lobby)
                return {
                    result: true,
                    msg: "Discussion phase complete, progressing to voting phase"
                }
            case 6: // Voting to results
                if (lobby.voteLimit != Object.keys(lobby.votes).length) {
                    return {
                        result: false,
                        msg: "Not enough players voted"
                    }
                }
                console.log("Lobby " + lobbyCode + ": progressing to results phase")
                lobby.state = 7
                this.updateLobby(lobbyCode, lobby)
                return {
                    result: true,
                    msg: "Voting phase complete, progressing to results phase"
                }
            case 7: // Results to Ending Game
                console.log("Lobby " + lobbyCode + ": progressing to end phase")
                lobby.state = 8
                this.updateLobby(lobbyCode, lobby)
                return {
                    result: true,
                    msg: "Results phase complete, progressing to end phase"
                }
            case 8: // Starting to Starting
                break;
        }
    }

    async getUserState(lobbyCode, socket) {
        //????
    }

    async getUsername(lobbyCode, socket) {
        var lobbyDoc = await this.getLobby(lobbyCode)
        var playerID = lobbyDoc.socketToPlayers[socket]
        return {
            result: true,
            username: playerID
        }
    }

    async getNickname(lobbyCode, socket) {
        var lobbyDoc = await this.getLobby(lobbyCode)
        var playerID = lobbyDoc.socketToPlayers[socket]
        const nickname = lobbyDoc.players[playerID]
        return {
            result: true,
            nickname: nickname
        }
    }

    //fetch individual lobby json
    async getLobby(lobbyCode) {
        const lobby = await this.client.get(lobbyCode)
        return lobby
    }

    async setLobbyEvents(lobbyCode, eventArray) {
        const lobby = await this.client.get(lobbyCode)
        if (lobby.state != 2) {
            return {
                result: false,
                msg: "Game State is incorrect for storing events"
            }
        }
        lobby.events = eventArray
        const updateResult = await this.updateLobby(lobbyCode, lobby)
        if (updateResult.result) {
            return {
                result: true,
                msg: "Events stored successfully"
            }
        }
    }

    async addVote(lobbyCode, target) {
        const lobby = await this.client.get(lobbyCode)
        if (!lobby.players[target]) {
            return {
                result: false,
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
            result: true,
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
        if (lobby == null) return { result: false, msg: "Lobby does not exist" };
        this.client.setex(lobbyCode, DEFAULT_EXPIRATIION, JSON.stringify(lobbyDoc))
        return {
            result: true,
            msg: "Lobby updated"
        };
    }
}
