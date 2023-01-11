import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
    name: 'chat',
    initialState:{
        chat: []
    },
    reducers: {
        AddMessage: (state,message) => {
            console.log("adding message",message)
            state.chat.push(message.payload)
        }
    }
})

export const { AddMessage } = chatSlice.actions

export default chatSlice.reducer