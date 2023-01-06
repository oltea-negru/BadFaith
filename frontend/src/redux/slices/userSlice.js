import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        nickname: '',
        email: '',
        password: '',
        friends: '',
        avatar: 0,
        stats: {
            achievements: [],
            wins: 0,
            totalGames: 0
        }
    },
    reducers: {
        setSettings: (state, action) =>
        {
            state.nickname = action.payload.nickname
            state.avatar = action.payload.avatar
            state.password = action.payload.password
            console.log(state.nickname)
            console.log(state.avatar)
            console.log(state.password)
        },
        setCredentials: (state, action) =>
        {
            state.email = action.payload.email
            state.password = action.payload.password
            console.log(state.email)
            console.log(state.password)
        },
        // setRegister:(state, action) => {
        //     state.email = action.payload.email
        //     state.password = action.payload.password
        //     state.avatar = action.payload.avatar
        //     console.log(state.email)
        //     console.log(state.password)
        //     console.log(state.avatar)
        // },
        setFriends: (state, action) =>
        {
            state.friends = action.payload.friends
        },
        incrementWin: state =>
        {
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

export const { setCredentials, incrementWin, incrementGame, setState, setSettings } = userSlice.actions

export default userSlice.reducer