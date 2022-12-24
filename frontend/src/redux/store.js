import { configureStore } from '@reduxjs/toolkit'
import gameSlice from './slices/gameSlice'
import userSlice from './slices/userSlice'


export default configureStore({
    reducer: {
        user: userSlice,
        game: gameSlice
    }
})
