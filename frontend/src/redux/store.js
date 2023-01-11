import { configureStore } from '@reduxjs/toolkit'
import { gameServerMiddleware } from './middleware/gameServerMiddleware'
import gameSlice from './slices/gameSlice'
import userSlice from './slices/userSlice'


export default configureStore({
    reducer: {
        user: userSlice,
        game: gameSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gameServerMiddleware)
})
