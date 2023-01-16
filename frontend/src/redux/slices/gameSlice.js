import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        lobby: {
            players: {},
            readyUp: 0,
            socketToPlayers: {},
            votes: {},
            playerToSockets: {},
            state: 1,
            currentEvent: {},
            eventHistory: [],
            events: [],
            voteLimit: 0
        },
        player: {
            socketId: "",
            role: "",
            target: "",
            nickname: "",
            allegiance: "",
            original: "",
            isReady: false,
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
        toggleReady: (state, action) => {
            state.player.isReady = action.payload
        },
        updateVote: (state, action) => {
            state.player.vote = action.payload
        },
        updateLobbyCode: (state, action) =>
        {
            state.lobbyCode = action.payload
        }
    }
})

export const { updatePlayerID, updateLobby, updatePlayer, toggleReady, updateVote, updateLobbyCode } = gameSlice.actions

export default gameSlice.reducer