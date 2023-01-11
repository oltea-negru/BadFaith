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
            ready: false,
            vote: ""
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
        },
        toggleReady: (state, isReady) => {
            state.player.ready = isReady
        },
        updateVote: (state, vote) => {
            state.player.vote = vote
        }
    }
})

export const { updatePlayerID, updateLobby, updatePlayer, toggleReady, updateVote } = gameSlice.actions

export default gameSlice.reducer