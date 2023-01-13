const bluebird = require('bluebird');
const redis = require('redis');
const schema = require('./schema.json')

bluebird.promisifyAll(redis);

const redisHost = process.env.REDIS_HOST || 'localhost'
const redisPort = process.env.REDIS_PORT || '6379'
DEFAULT_EXPIRATION = 3600

const PrivateCall = ["There is a private phone call for this player.", '<br />', "They will be with back shortly."]

const Events = {
    OldAllies: {
        BlindName: "Old Allies",
        EventTitle: "Old Allies",
        BlindInfo: ["Two players are revelead to have appeared as the same team at the start"],
        Details: ["Two players are revelead to have appeared as the same team at the start"]
    },
    OldEnemies: {
        BlindName: "Old Enemies",
        EventTitle: "Old Enemies",
        BlindInfo: ["Two players are revelead to have appeared on opposite teams at the start"],
        Details: ["Two players are revelead to have appeared on opposite teams at the start"],
    },
    DeepState: {
        BlindName: "Private Call",
        EventTitle: "Deep State",
        BlindInfo: PrivateCall,
        Details: ["Deep State"],
    },
    SplinterCell: {
        BlindName: "Private Call",
        EventTitle: "Splinter Cell",
        BlindInfo: PrivateCall,
        Details: ["Splinter Cell"]
    },
    BackroomDeal: {
        BlindName: "Backroom Deal",
        EventTitle: "Backroom Deal",
        BlindInfo: ["Their loyalty is being put to the test.", '<br />', "Is it strong enough?"],
        Details: ["You have the option to switch teams, but if you do so you cannot vote.", '<br />', "Do you accept?"]
    },
    Martyr: {
        BlindName: "Private Call",
        EventTitle: "Martyr",
        BlindInfo: PrivateCall,
        Details: ["You have been chosen as a Martyr, get yourself voted and you will be rewarded."]
    },
    BackgroundCheck: {
        BlindName: "Background Check",
        EventTitle: "Background Check",
        BlindInfo: ["We have done a little digging. Here is what we know..."],
        Details: ["We have done a little digging. Here is what we know..."]
    },
    GagOrder: {
        BlindName: "Gag Order",
        EventTitle: "Gag Order",
        BlindInfo: ["Someone is being a little too loud. Use this opportunity to prevent them from voting."],
        Details: ["Someone is being a little too loud. Use this opportunity to prevent them from voting."]
    },
    BlackMark: {
        BlindName: "Black Mark",
        EventTitle: "Black Mark",
        BlindInfo: ["Choose a player to add an extra vote against"],
        Details: ["Choose a player to add an extra vote against"]
    },
    Coup: {
        BlindName: "Private Call",
        BlindInfo: PrivateCall,
        EventTitle: ["Coup d'etat"],
        Details: ["Coup d'etat"]

    },
    Blackmailed: {
        BlindName: "Blackmailed",
        EventTitle: "Blackmailed",
        BlindInfo: ["Another player has some dirt on you that cannot come to light.", '<br />', "You will only win if they do."],
        Details: ["Another player has some dirt on you that cannot come to light.", '<br />', "You will only win if they do."],
    },
    BodyGuard: {
        BlindName: "Bodyguard",
        EventTitle: "Bodyguard",
        BlindInfo: ["You have been employed to protect another.", '<br />', "They cannot be voted out."],
        Details: ["You have been employed to protect another.", '<br />', "They cannot be voted out."]
    }
}

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
        const lobbyExists = await this._getLobby(lobbyCode)
        if (lobbyExists == null) {
            await this.client.SETEX(lobbyCode, DEFAULT_EXPIRATION, JSON.stringify(lobbyDoc))
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
        // console.log('PlayerJoining', hostDetails)
        const lobbyDoc = await this._getLobby(lobbyCode)
        if (lobbyDoc == null) {
            return {
                ok: false,
                msg: "Lobby does not exist"
            }
        }
        if (Object.keys(lobbyDoc.players).length == 9) return { ok: false, msg: "Game is full" }
        if (lobbyDoc.state != 1) return { ok: false, msg: "Game has already started" }
        await this.setActivePlayer(hostDetails.playerID, hostDetails.socketID, lobbyCode)
        if (!lobbyDoc.players[hostDetails.playerID]) { //if player is not in the game already
            lobbyDoc.players[hostDetails.playerID] = schema.player
            if (hostDetails.nickname == "") {
                const playerIDSplit = hostDetails.playerID.split("@")
                lobbyDoc.players[hostDetails.playerID].nickname = playerIDSplit[0]
            } else {
                lobbyDoc.players[hostDetails.playerID].nickname = hostDetails.nickname
            }

            lobbyDoc.voteLimit++;
        }

        lobbyDoc.players[hostDetails.playerID].socketID = hostDetails.socketID
        lobbyDoc.socketToPlayers[hostDetails.socketID] = hostDetails.playerID
        lobbyDoc.playerToSockets[hostDetails.playerID] = hostDetails.socketID
        // console.log("Lobby " + lobbyCode + ": adding " + hostDetails.playerID + " with " + hostDetails.socketID)
        return (await this.updateLobby(lobbyCode, lobbyDoc))
    }

    //Check that the lobby exists 
    async doesLobbyExist(lobbyCode) {
        var lobbyDoc = await this._getLobby(lobbyCode)
        return (lobbyDoc != null)
    }

    async toggleReady(lobbyCode, socket) {
        var lobbyDoc = await this._getLobby(lobbyCode)
        // console.log('Debug Socket', socket)
        // console.log('socketToPlayers',lobbyDoc.socketToPlayers)
        const playerID = lobbyDoc.socketToPlayers[socket]
        // console.log('Debug PlayerID', playerID)
        if (lobbyDoc.players[playerID].ready) {
            lobbyDoc.readyUp--
        }
        else {
            lobbyDoc.readyUp++
        }
        lobbyDoc.players[playerID].ready = !lobbyDoc.players[playerID].ready
        const readyResult = await this.updateLobby(lobbyCode, lobbyDoc)
        const progressResult = await this.progressGameState(lobbyCode)
        if (progressResult?.ok) {
            return {
                progressState: true
            }
        }

        if (readyResult.ok) {
            return {
                ok: true,
                isReady: lobbyDoc.players[playerID].ready
            }
        }

        else {
            return readyResult
        }
    }

    async getReadyCounter(lobbyCode) {
        const lobby = await this._getLobby(lobbyCode)
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
        const lobby = await this._getLobby(lobbyCode)
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

    async resetReady(lobby) {
        lobby.readyUp = 0
        for (const player of Object.values(lobby.players)) {
            player.ready = false
        }
    }

    // TODO Remove inbetweeen state -> add seamless event to event progression
    async progressGameState(lobbyCode) {
        const lobby = await this._getLobby(lobbyCode)
        if (lobby == null) return {
            ok: false,
            msg: "Lobby does not exist"
        };
        switch (lobby.state) {
            case 1: // Joining to Starting
                // check that number of 'readys' is equal to number of
                // console.log("No. players", Object.keys(lobby.players).length)
                if (Object.keys(lobby.players).length < 5) {
                    return {
                        ok: false,
                        msg: "Not enough players"
                    }
                }
                if (lobby.readyUp != Object.keys(lobby.players).length) {
                    return {
                        ok: false,
                        msg: "Not enough players ready"
                    }
                }
                // console.log("Lobby " + lobbyCode + ": progressing to start game phase")
                lobby.state = 2
                lobby.players = SetAllegiances(lobby)
                lobby.events = GenerateEvents(lobby)
                lobby.enemyCount = GetEnemyCount(lobby)
                if (lobby.events.length != Object.keys(lobby.players).length) {
                    // the wrong number of events has been generated
                    return {
                        ok: false,
                        msg: "Incorrect number of events to progress: " + lobby.events.length
                    }
                }
                for (const [player, data] in lobby.players) {
                    // console.log(player + ": " + data.allegiance)
                    if (data.allegiance == "") {
                        //Player has not been allocated a team
                        return {
                            ok: false,
                            msg: "Player: " + player + " has not been allocated a team"
                        }
                    }
                }
                // console.log("Lobby " + lobbyCode + ": progressing to in between events")
                await this.resetReady(lobby)
                // console.log('Check func worked', lobby)
                lobby.state = 3
                await this.updateLobby(lobbyCode, lobby)
                return {
                    ok: true,
                    msg: "Lobby events and players initialised, progressing to between events"
                }
            case 3: // Enemies see each other
                await this.resetReady(lobby)
                lobby.state = 4
                await this.updateLobby(lobbyCode, lobby)
                return {
                    ok: true,
                    msg: "Enemey meetup "
                }
            case 4: // Between events
                if (lobby.events.length == 0) { // no more events, progress to discussion
                    // console.log("Lobby " + lobbyCode + ": progressing to discussion phase")
                    lobby.state = 6
                    await this.updateLobby(lobbyCode, lobby)
                    return {
                        ok: true,
                        msg: "Progressed to discussion"
                    }
                } else { // moving to next event
                    // console.log("Lobby " + lobbyCode + ": progressing to next event")
                    if (Object.keys(lobby.currentEvent).length != 0) lobby.eventHistory.push(lobby.currentEvent);
                    lobby.currentEvent = lobby.events.shift()
                    await this.resetReady(lobby)
                    lobby.state = 5
                    await this.updateLobby(lobbyCode, lobby)
                    return {
                        ok: true,
                        msg: "Progressed to next event"
                    }
                }
            case 5: // In event to inbetween
                //conditions needed
                // console.log("Lobby " + lobbyCode + ": progressing to in between events")
                await this.resetReady(lobby)
                lobby.state = 4
                await this.updateLobby(lobbyCode, lobby)
                return {
                    ok: true,
                    msg: "Current event completed, progressing to between events"
                }
            case 6: // Discussion to voting
                // console.log("Lobby " + lobbyCode + ": progressing to voting phase")
                await this.resetReady(lobby)
                lobby.state = 7
                await this.updateLobby(lobbyCode, lobby)
                return {
                    ok: true,
                    msg: "Discussion phase complete, progressing to voting phase"
                }
            case 7: // Voting to results
                const voteCount = Object.entries(lobby.votes).reduce((voteCount, player) => voteCount + player[1], 0)
                // console.log('Vote count', voteCount)
                if (lobby.voteLimit != voteCount) {
                    return {
                        ok: false,
                        msg: "Not enough players voted"
                    }
                }
                // console.log("Lobby " + lobbyCode + ": progressing to results phase")
                await this.resetReady(lobby)
                lobby.state = 8
                await this.updateLobby(lobbyCode, lobby)
                return {
                    ok: true,
                    msg: "Voting phase complete, progressing to results phase"
                }
            case 8: // Results to Ending Game
                // console.log("Lobby " + lobbyCode + ": progressing to end phase")
                await this.resetReady(lobby)
                lobby.state = 9
                await this.updateLobby(lobbyCode, lobby)
                return {
                    ok: true,
                    msg: "Results phase complete, progressing to end phase"
                }
            case 9: // Starting to Starting
                break;
        }
    }

    async getSyncPlayerHash(playerID) {
        if (playerID == null) return { ok: false, hash: null }
        const sync = await this.client.get(playerID)
        return { ok: true, hash: JSON.parse(sync) }
    }

    async getSyncSocketHash(socketID) {
        if (socketID == null) return { ok: false, playerID: null }
        const playerID = await this.client.get(socketID)
        return { ok: true, playerID }
    }

    async _setSyncHash(playerID, hash) {
        await this.client.SETEX(playerID, DEFAULT_EXPIRATION, JSON.stringify(hash))
        await this.client.SETEX(hash.socketID, DEFAULT_EXPIRATION, playerID)
    }

    async disconnectPlayerSocket(socketID) {
        const playerID = (await this.getSyncSocketHash(socketID)).playerID
        if (!playerID) return
        let playerHash = (await this.getSyncPlayerHash(playerID)).hash
        playerHash.socketID = ''
        await this._setSyncHash(playerID, playerHash)
        await this.client.del(socketID)
    }

    async disconnectPlayerRoom(playerID) {
        let playerHash = (await this.getSyncPlayerHash(playerID)).hash
        const lobbyCode = playerHash.lobbyCode
        playerHash.lobbyCode = ''
        const lobby = await this._getLobby(lobbyCode)
        delete lobby.players[playerID]
        const socketID = lobby.playerToSockets[playerID]
        delete lobby.playerToSockets[playerID]
        delete lobby.socketToPlayers[socketID]
        await this._setSyncHash(playerID, playerHash)
        await this.updateLobby(lobbyCode, lobby)
    }


    async syncPlayer(playerID, sentHash) {
        const hash = (await this.getSyncPlayerHash(playerID)).hash || {}
        hash.socketID = sentHash.socketID
        hash.lobbyCode = sentHash.BackgroundChecklobbyCode
        await this._setSyncHash(playerID, hash)
        return { ok: true, inGame: (hash.lobbyCode == null || hash.lobbyCode == "") }
    }

    async getUserState(lobbyCode, socket) {
        const lobby = await this._getLobby(lobbyCode)
        const playerID = lobby.socketToPlayers[socket]
        return lobby
    }

    async getSockets(lobbyCode) {
        const lobby = await this._getLobby(lobbyCode)
        return Object.keys(lobby.socketToPlayers);
    }

    async getPlayer(lobbyCode, socket) {
        const lobby = await this._getLobby(lobbyCode)
        const playerID = lobby.socketToPlayers[socket]
        // console.log("Player",lobby.players[playerID])
        return {
            ok: true,
            player: lobby.players[playerID]
        }
    }

    async updatePlayer(lobbyCode, playerDetails) {
        const lobby = {...await this._getLobby(lobbyCode)}
        // console.log("SocketMap", lobby.socketToPlayers)
        // console.log('UpdatePlayer', playerDetails)
        const socket = playerDetails.socketID
        // console.log("UpdateFromSocket",socket)
        const playerID = lobby.socketToPlayers[socket]
        // console.log("UpdateToPlayer", playerID)
        lobby.players[playerID] = playerDetails
        // console.log("PlayerChanged", lobby.players[playerID])
        return await this.updateLobby(lobbyCode, lobby)
    }

    async updateLobbyPlayerSocket(lobbyCode, playerID, socket) {
        if (lobbyCode == null || playerID == null || socket == null) {
            return {
                ok: false,
                msg: "Missing paramerters",
                lobbyCode: lobbyCode != null,
                playerID: playerID != null,
                socket: socket != null
            }
        }
        const lobby = await this._getLobby(lobbyCode)
        lobby.players[playerID].socketID = socket
        const oldSocket = lobby.playerToSockets[playerID]
        delete lobby.socketToPlayers[oldSocket]
        lobby.socketToPlayers[socket] = playerID
        lobby.playerToSockets[playerID] = socket
        await this.updateLobby(lobbyCode, lobby)
        return { ok: true, msg: "Updated " + playerID + "'s socket to " + socket }
    }
    async getUsername(lobbyCode, socket) {
        const lobby = await this._getLobby(lobbyCode)
        var playerID = lobby.socketToPlayers[socket]
        return {
            ok: true,
            username: playerID
        }
    }

    async getNickname(lobbyCode, socket) {
        var lobbyDoc = await this._getLobby(lobbyCode)
        var playerID = lobbyDoc.socketToPlayers[socket]
        const nickname = lobbyDoc.players[playerID].nickname
        return {
            ok: true,
            nickname: nickname
        }
    }

    //fetch individual lobby json
    async _getLobby(lobbyCode) {
        if (lobbyCode == null) return null
        const lobby = JSON.parse(await this.client.get(lobbyCode))
        // if(lobby != null && lobby.state > 3) console.log("Lobby",lobby.players)
        
        return lobby
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
        const players = await this.getActivePlayers() || {}
        const hash = {
            lobbyCode: lobbyCode,
            socketID: socket
        }
        players[playerID] = hash
        await this._setSyncHash(playerID, hash)
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
        // console.log('VoteLobbyCode', lobbyCode)
        // console.log('VoteTarget', target)
        const username = (await this.getUsername(lobbyCode, target.socketID)).username
        const lobby = await this._getLobby(lobbyCode)
        if (!lobby.players[username]) {
            return {
                ok: false,
                msg: "Player does not exist"
            }
        }
        if (lobby.votes[username]) {
            lobby.votes[username]++
        } else {
            lobby.votes[username] = 1
        }
        await this.updateLobby(lobbyCode, lobby)
        const isProgressed = (await this.progressGameState(lobbyCode))?.ok
        return {
            ok: true,
            msg: isProgressed ? "Progressed" : "Vote added"
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
        const lobby = await this._getLobby(lobbyCode)
        if (lobby == null) return { ok: false, msg: "Lobby does not exist" };
        // console.log("UpdatedLobby",lobbyDoc)
        await this.client.SETEX(lobbyCode, DEFAULT_EXPIRATION, JSON.stringify(lobbyDoc))
        // console.log("RecalledLobby",await this._getLobby(lobbyCode))
        return {
            ok: true,
            msg: "Lobby updated"
        };
    }
}

function GetEnemyCount(lobby_state) {
    const players = Object.keys(lobby_state.players)
    switch (players.length) {
        case 4:
            return 1
        case 5:
            return 1
        case 6:
            return 1
        case 7:
            return 2
        case 8:
            return 2
        case 9:
            return 3
    }
}

function SetAllegiances(lobby_state) {
    // console.log('Lobby',lobby_state)
    const players = Object.keys(lobby_state.players)
    const updatedPlayers = lobby_state.players
    let enemyNo = 0
    switch (players.length) {
        case 4:
            enemyNo = 1
        case 5:
            enemyNo = 1
            break;
        case 6:
            enemyNo = 1
            break;
        case 7:
            enemyNo = 2
            break;
        case 8:
            enemyNo = 2
            break;
        case 9:
            enemyNo = 3
            break;
    }
    //set enemies
    for (let i = 0; i < enemyNo; i++) {
        let index = [Math.floor((Math.random() * players.length))]
        while (updatedPlayers[players[index]].allegiance != "") {
            index = [Math.floor((Math.random() * players.length))]
        }
        updatedPlayers[players[index]].allegiance = "Enemy"
        updatedPlayers[players[index]].original = "Enemy"
    }
    for (let i = 0; i < players.length; i++) {
        if (updatedPlayers[players[i]].allegiance == "") {
            updatedPlayers[players[i]].allegiance = "Ally"
            updatedPlayers[players[i]].original = "Ally"
        }
    }

    return updatedPlayers
}

function GenerateEvents(lobby_state) {
    let events = [];
    getPlayerArray(lobby_state.players).map(player => {
        const eventName = RandomUniqueEvent(events);
        console.log("Events",events)
        console.log("NewEvent",eventName)
        const event = EventGenMap(eventName, player, lobby_state.players);
        events.push(event);
    });
    shuffle(events)
    return events
}

function excludePlayer(player) {
    return function (p) {
        return p.nickname != player.nickname;
    };
}

function EventGenMap(eventName, player, players) {
    // console.log('Event',eventName)
    const event = Events[eventName];//fetch event strings
    const playerArray = getPlayerArray(players)
    const valid = playerArray.filter(excludePlayer(player));
    let extra_players;
    switch (eventName) {
        case "OldAllies": //Started game on the same team
            extra_players = getSameStartTeam(valid);
            break;
        case "OldEnemies": //Started the game as enemies
            extra_players = getOppStartTeams(valid);
            break;
        case "DeepState": // Swap team- Hidden event
            break;
        case "SplinterCell": // Turns player to standalone - Hidden event
            break;
        case "BackroomDeal": // Can choose to betray team, cannot vote if so
            break;
        case "Martyr": //Will die for the cause - Hidden event
            break;
        case "BackgroundCheck": // Current appeared allegience
            extra_players = SinglePlayer(valid);
            break;
        case "GagOrder": //Prevent a player of choice from voting
            extra_players = valid;
            break;
        case "BlackMark": //Give an extra vote to player of choice
            extra_players = valid;
            break;
        case "Coup": //Given player must be elminated to win - Hidden event
            extra_players = SinglePlayer(valid);
            break;
        case "Blackmailed": //Given player must win in order to win
            extra_players = SinglePlayer(valid);
            break;
        case "BodyGuard": //Given player cannot be voted out in order to win
            extra_players = SinglePlayer(valid);
            break;
    }
    let eventObject = { //arrange data into expected format for events
        player: player,
        extra_players: extra_players,
        blind_name: event.BlindName,
        event_name: event.EventTitle,
        blind_info: event.BlindInfo,
        details: event.Details,
        event_function: eventName
    };
    return eventObject;
}

function getSameStartTeam(players) {
    // console.log(players);
    const p1 = players[Math.floor((Math.random() * players.length))]; //select valid players
    // console.log(p1);
    const valid = players.filter(excludePlayer(p1));
    // console.log(valid);
    const validSecond = valid.filter(OriginalAllies(p1));
    // console.log(validSecond);
    const p2 = validSecond[Math.floor((Math.random() * validSecond.length))];
    return [p1, p2];
}

function getOppStartTeams(players) {
    const p1 = players[Math.floor((Math.random() * players.length))]; //select valid players
    const validSecond = players.filter(p => {
        return p.original != p1.original;
    });
    const p2 = validSecond[Math.floor((Math.random() * validSecond.length))];
    return [p1, p2];
}

function SinglePlayer(players) {
    return [players[Math.floor((Math.random() * players.length))]]; //select valid players
}

function RandomUniqueEvent(events) {
    let keys = Object.keys(Events);
    let key = keys[Math.floor((Math.random() * keys.length))];
    while (events.includes(Events[key])) {
        key = keys[Math.floor((Math.random() * keys.length))];
    }
    return key;
}

function getPlayerArray(players) {
    let playerArray = [];
    Object.keys(players).forEach(player => {
        playerArray.push(players[player]);
    })
    return playerArray;
}

function OriginalAllies(player) {
    return function (p) {
        return p.original === player.original;
    };
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

module.exports.HotStorageClient = HotStorageClient;
