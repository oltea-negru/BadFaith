import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
    name: 'game',
    initialState:{
        role: '',
        eventInfo: {
            name: '',
            evidence: '',
            isMyEvent: false
        },
        eventHistory: [],
        players: []
    },
    reducers: {
        updateRole: (state, action) => {
            state.role = action.payload
        },
        updateEvent: (state, action) => {
            state.eventInfo = action.payload
        },
        updateEventHistory: state => {
            state.eventHistory.push(state.eventInfo)
        },
        updatePlayers: (state, action) => {
            state.players = action.payload
        }
    }
})

export const { updateRole, updateEvent, updateEventHistory, updatePlayers } = gameSlice.actions

export default gameSlice.reducer