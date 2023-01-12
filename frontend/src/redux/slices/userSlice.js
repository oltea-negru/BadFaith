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
        },
        loading: false,
        error: null
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
            state.avatar = action.payload.avatar
            console.log("AvatarInt" + state.avatar)
            console.log(state.email)
            console.log(state.password)
        },
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
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { setCredentials, incrementWin, incrementGame, setState, setSettings, setLoading, setError } = userSlice.actions

export default userSlice.reducer