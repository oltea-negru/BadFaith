import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        nickname: '',
        email: '',
        password: '',
        friends: '',
        stats: {
            achievements: [],
            wins: 0,
            totalGames: 0
        }
    },
    reducers: {
        setUserDetails: (state, action) =>
        {
            state.nickname = action.payload.nickname
            state.email = action.payload.email
            // state.friends = action.payload.friends
            // state.avatar = action.payload.avatar
            // state.stats = action.payload.stats
        },
        setCredentials:(state, action) => {
            state.email = action.payload.email
            state.password = action.payload.password
            console.log(state.email)
            console.log(state.password)
        },
        setFriends: (state, action) => {
            state.friends = action.payload.friends
        },
        incrementWin: state => {
            state.stats.wins++
            state.stats.totalGames++
        },
        incrementGame: state =>
        {
            state.stats.totalGames++
        },
        setState: (state, action) =>
        {
            state = action.payload
        }
    }
})

export const { setUserDetails, incrementWin, incrementGame, setState, setCredentials} = userSlice.actions

export default userSlice.reducer