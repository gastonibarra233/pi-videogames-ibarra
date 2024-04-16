import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SearchBar.css";

//redux
import { fetchAllGenres } from "../../redux/genreSlice";
import { getByGenre, searchByName } from "../../redux/gameSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres.list);
  const selected = useSelector((state) => state.games.selectedGenre);

  //search input
  const [input, setInput] = useState("");
  const handleInput = ({ target }) => {
    setInput(target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchByName(input));
    setInput("");
  };

  //select genres
  const options = genres.length
    ? genres.map((g) => {
        return { label: g.name, value: g.name };
      })
    : [];

  const selectHandleOnChange = ({ target }) => {
    dispatch(getByGenre(target.value));
  };

  useEffect(() => {
    dispatch(fetchAllGenres());
  }, [dispatch]);

  return (
    <div className="search-bar">
      <form>
        <input
          type="text"
          className="search-input"
          placeholder="Search by name..."
          onChange={handleInput}
          value={input}
        />
        <button className="search-button" type="submit" onClick={handleSearch}>
          <svg className="search-icon" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </svg>
        </button>
      </form>
      <div className="search-select">
        <label>
          <select onChange={selectHandleOnChange} value={selected}>
            <option key="0" value="0">
              Select Genre...
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default SearchBar;
