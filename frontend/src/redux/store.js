import { configureStore } from '@reduxjs/toolkit'
import { gameServerMiddleware } from './middleware/gameServerMiddleware'
import chatSlice from './slices/chatSlice'
import gameSlice from './slices/gameSlice'
import userSlice from './slices/userSlice'


export default configureStore({
    reducer: {
        user: userSlice,
        game: gameSlice,
        chat: chatSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gameServerMiddleware)
})
