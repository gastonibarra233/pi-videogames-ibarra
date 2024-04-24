import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL_GAMES = "http://localhost:3000/videogames";
const URL_GAMES_PLATFORMS = "http://localhost:3000/videogames/platforms";

const defaultOrder = {
  ALPHABETIC: "ASC",
};

const initialState = {
  list: [],
  filtered: [],
  order: defaultOrder,
  source: "ALL",
  selectedGenre: "0",
  currentPage: 1,
  detail: {},
  loading: true,
  status: "",
  searchName: "",
  platforms: [],
};
export const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
      state.loading = false;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setAllGames(state, action) {
      state.list = action.payload;
      state.filtered = action.payload;
      state.order = defaultOrder;
      state.current = 1;
      state.detail = {};
      state.loading = false;
    },
    clearGames() {
      return {
        ...initialState,
      };
    },
    setDetail(state, action) {
      state.detail = action.payload;
      state.loading = false;
      state.status = "";
    },
    clearDetail(state) {
      state.detail = {};
      state.status = "";
    },
    setSelectedGenres(state, action) {
      state.selectedGenre = action.payload;
    },
    setPlatforms(state, action) {
      state.platforms = action.payload;
    },
    clearPlatforms() {
      return {
        ...initialState,
      };
    },
    setSource(state, action) {
      state.source = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
    setSearchName(state, action) {
      state.searchName = action.payload;
    },

    applyFilters(state) {
      //apply all filters - payload = all dogs
      let filtered = state.list.flat();
      //apply filter by source
      filtered =
        state.source === "ALL"
          ? filtered
          : filtered.filter((fil) => fil.source === state.source);
      //apply filter by genre
      filtered =
        state.selectedGenre === "0"
          ? filtered
          : filtered.filter((g) => g.genres.includes(state.selectedGenre));

      state.filtered = filtered.flat();
      state.loading = false;
      state.currentPage = 1;
    },
    applyOrder(state) {
      const flattenedFiltered = state.filtered.flat();
      let sortedArr = [];

      if (state.order.ALPHABETIC) {
        sortedArr =
          state.order.ALPHABETIC === "ASC"
            ? [...flattenedFiltered].sort((a, b) =>
                a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
              )
            : [...flattenedFiltered].sort((a, b) =>
                b.name.toLowerCase() > a.name.toLowerCase() ? 1 : -1
              );
      } else {
        sortedArr =
          state.order.RATING === "ASC"
            ? [...flattenedFiltered].sort((a, b) =>
                a.rating > b.rating ? 1 : -1
              )
            : [...flattenedFiltered].sort((a, b) =>
                b.rating > a.rating ? 1 : -1
              );
      }
      return {
        ...state,
        filtered: sortedArr,
        currentPage: 1,
      };
    },
  },
});
export const getByOrder = (order) => {
  return (dispatch) => {
    try {
      dispatch(setOrder(order));
      dispatch(applyOrder());
    } catch (error) {
      console.error("getByOrder:", error.message);
    }
  };
};

// filter by Source
export const getBySource = (source) => {
  return (dispatch) => {
    try {
      dispatch(setSource(source));
      dispatch(applyFilters());
      dispatch(applyOrder());
      dispatch(setStatus(""));
    } catch (error) {
      console.error("getBySource:", error.message);
      dispatch(setStatus(error.message));
    }
  };
};

// filter by Genres
export const getByGenre = (selected) => {
  return (dispatch) => {
    try {
      dispatch(setSelectedGenres(selected));
      dispatch(applyFilters());
      dispatch(applyOrder());
      dispatch(setStatus(""));
    } catch (error) {
      console.error("getByGenre:", error.message);
      dispatch(setStatus(error.message));
    }
  };
};

// filter by platforms
export const getByPlatforms = (selected) => {
  return async (dispatch) => {
    try {
      dispatch(setPlatforms(selected));
      dispatch(applyFilters());
      dispatch(applyOrder());
      dispatch(setStatus(""));
    } catch (error) {
      console.error("getByPlatforms:", error.message);
      dispatch(setStatus(error.message));
    }
  };
};

export const fetchAllPlatforms = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_GAMES_PLATFORMS}`);
      dispatch(setPlatforms(data));
    } catch (error) {
      console.error("fetchAllPlatforms:", error.message);
    }
  };
};

//load all games from API and DB
export const fetchAllGames = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.get(`${URL_GAMES}`);
      dispatch(setAllGames(data));
    } catch (error) {
      dispatch(setStatus(error.message));
    }
  };
};

//search by name
export const searchByName = (name) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setSearchName(name));
      const { data } = await axios.get(`${URL_GAMES}?name=${name}`);
      dispatch(setAllGames(data));
      if (data.length) {
        dispatch(applyFilters(data));
      } else {
        dispatch(setStatus("NOTFOUND"));
      }
    } catch (error) {
      console.error("searchByName:", error.message);
      dispatch(setStatus(error.message));
    }
  };
};

// search by ID and fill Detail
export const searchById = (idVideogame) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.get(`${URL_GAMES}/${idVideogame}`);
      if (data) {
        dispatch(setDetail(data));
      } else {
        dispatch(setStatus("NOTFOUND"));
      }
    } catch (error) {
      console.error("searchById:", error.message);
      dispatch(setStatus(error.response ? error.response.data : error.message));
    }
  };
};

//create new game
export const postNewGame = (formData) => {
  return async (dispatch) => {
    try {
      const { data: gameCreated } = await axios.post(`${URL_GAMES}`, formData);
      const { data } = await axios.get(`${URL_GAMES}`);
      dispatch(setAllGames(data));
      dispatch(applyFilters());
      dispatch(applyOrder());
      dispatch(setStatus("OK"));
      return gameCreated;
    } catch (error) {
      //catch unique error.
      const message = error
        ? error.data.includes("games_name_key")
          ? `The name "${formData.name}" already exists!`
          : error.data
        : error.message;
      dispatch(setStatus(message));
      console.error("postNewGame:", error);
    }
  };
};

//delete from DB
//COMPLETAR CAMPO

export const {
  setLoading,
  setStatus,
  setCurrentPage,
  setAllGames,
  clearGames,
  setDetail,
  clearDetail,
  setSelectedGenres,
  setPlatforms,
  clearPlatforms,
  setSource,
  setOrder,
  setSearchName,
  applyFilters,
  applyOrder,
} = gameSlice.actions;

export default gameSlice.reducer;
