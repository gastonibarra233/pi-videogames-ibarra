import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL_GENRES = 'http://localhost:3000/genres'

const initialState = {
  list: [],
};

const genreSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    setAllGenres(state, action) {
      state.list = action.payload;
    },
    clearGenres() {
      return {
        ...initialState,
      };
    },
  },
});

export const fetchAllGenres = () => {
    return async (dispatch) => {
        try {
          const { data } = await axios.get(`${URL_GENRES}`)
            dispatch(setAllGenres(data))
        } catch (error) {
            console.error("getBySource:", error.message)
        }
    }
}

export const { setAllGenres, clearGenres } = genreSlice.actions

export default genreSlice.reducer