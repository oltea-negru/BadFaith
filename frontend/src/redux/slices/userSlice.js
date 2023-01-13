import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
    name: 'user',
    initialState,
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
        },
        resetUser: (state,) => {
            state.email = ''
        }
    }
})

export const { setCredentials, incrementWin, incrementGame, setState, setSettings, setLoading, setError, resetUser } = userSlice.actions

export default userSlice.reducer