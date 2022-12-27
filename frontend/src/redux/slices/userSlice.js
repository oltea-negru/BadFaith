import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        nickname: '',
        email: '',
        friends: '',
        stats: {
            achievements: [],
            wins: 0,
            totalGames: 0 
        }
    },
    reducers: {
        setUserDetails: (state, action) => {
            state.nickname = action.payload.nickname
            state.email = action.payload.email
        },
        setFriends: (state, action) => {
            state.friends = action.payload.friends
        },
        incrementWin: state => {
            state.stats.wins++
            state.stats.totalGames++
        },
        incrementGame: state => {
            state.stats.totalGames++
        },
        setState: (state, action) => {
            state = action.payload
        }
    }
})

export const { setUserDetails, incrementWin, incrementGame, setState } = userSlice.actions

export default userSlice.reducer