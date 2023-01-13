import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        lobby: {
            "inEvent": true,
            "id": "",
            "players": {
                "DummyID": {
                    nickname: "LoremIpsum",
                    icon: "Figure this out",
                    original: "Enemy",
                    allegiance: "Enemy"
                },
                "Lorem": {
                    nickname: "Sean Connery",
                    icon: "Figure this out",
                    original: "Enemy",
                    allegiance: "Ally"
                },
                "Ipsum": {
                    "nickname": "Travolta",
                    "icon": "Figure this out",
                    original: "Ally",
                    allegiance: "Enemy",
                    "target": "",
                },
                "Delta": {
                    nickname: "Geronimo",
                    original: "Ally",
                    allegiance: "Ally"
                },
                "Beta": {
                    nickname: "Jester",
                    original: "Enemy",
                    allegiance: "Enemy"
                }
            },
            "remainingPlayers": ["Lorem", "Snorlax"],
            "invited": [],
            "host": "",
            "code": "",
            "events": [],
            "state": 5,
            "eventHistory": [],
            "currentEvent": {
                "player": {
                    "nickname": "LoremIpsum",
                    "icon": "Figure this out",
                    "original": "Enemy",
                    "allegiance": "Enemy"
                },
                "extra_players": [
                    {
                        "nickname": "Geronimo",
                        "original": "Ally",
                        "allegiance": "Ally"
                    }
                ],
                "blind_name": "Blackmailed",
                "event_name": "Blackmailed",
                "blind_info": {
                    "location": null
                },
                "details": [
                    "Another player has some dirt on you that cannot come to light.",
                    "You will only win if they do."
                ],
                "event_function": "Blackmailed"
            }
        },
        player: {
            socketId: "",
            role: "",
            target: "",
            nickname: "",
            allegiance: "",
            original: "",
            ready: false,
            vote: ""
        },
        playerID: "Default",
        lobbyCode: ""
    },
    reducers: {
        updatePlayerID: (state, action) =>
        {
            state.playerID = action.payload
        },
        updateLobby: (state, action) =>
        {
            state.lobby = action.payload
        },
        updatePlayer: (state, action) =>
        {
            state.player = action.payload
        },
        toggleReady: (state, isReady) =>
        {
            state.player.ready = isReady
        },
        updateVote: (state, vote) =>
        {
            state.player.vote = vote
        },
        updateLobbyCode: (state, action) =>
        {
            state.lobbyCode = action.payload
        }
    }
})

export const { updatePlayerID, updateLobby, updatePlayer, toggleReady, updateVote, updateLobbyCode } = gameSlice.actions

export default gameSlice.reducer