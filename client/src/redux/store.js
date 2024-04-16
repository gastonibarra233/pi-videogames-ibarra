import { configureStore } from '@reduxjs/toolkit'
import games from './gameSlice'
import genres from './genreSlice'

const store = configureStore({
    reducer: {
        games,
        genres,
    }
})

export default store;