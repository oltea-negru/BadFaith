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
            ready: false
        },
        playerID: "Default"
    },
    reducers: {
        updatePlayerID: (state, action) => {
            state.playerID = action.payload
        },
        updateLobby: (state, action) => {
            state.lobby = action.payload
        },
        updatePlayer: (state, action) => {
            state.player = action.payload
        }
    }
})

export const { updatePlayerID, updateLobby, updatePlayer } = gameSlice.actions

export default gameSlice.reducer