import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  postNewGame,
  setStatus,
  fetchAllPlatforms,
} from "../../redux/gameSlice";
import { fetchAllGenres } from "../../redux/genreSlice";

import "./Create.css";

import NavBar from "../NavBar/NavBar";
import { Clock, Camera, CheckOK } from "../SvgIcons/SvgIcons";
import validate from "../../validate";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import placeholderImage from "../../images/placeholder-joystick.png";

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  //state
  const initialState = {
    name: "",
    description: "",
    releaseDate: "",
    image: "",
    rating: 0,
    genres: [],
    platforms: [],
  };
  const [field, setField] = useState(initialState);
  const [error, setError] = useState({});
  console.log(initialState)
  
  let status = useSelector((state) => state.games.status);

  //genres
  useEffect(() => {
    if (status) {
      //show and clean error
      setTimeout(() => {
        dispatch(setStatus(""));
      }, 4000);
    }
    dispatch(fetchAllGenres());
  }, [dispatch, status]);

  //platforms
  useEffect(() => {
    if (status) {
      setTimeout(() => {
        dispatch(setStatus(""));
      }, 4000);
    }
    dispatch(fetchAllPlatforms());
  }, [dispatch, status]);

  const genres = useSelector((state) => state.genres.list);
  const platforms = useSelector((state) => state.games.platforms);
  const options = genres
    ? genres.map((g) => {
        return { label: g.name, value: g.name };
      })
    : [];

  //handle genres behaviour
  const handleSelectChange = ({ target }) => {
    if (target.value !== "0") {
      if (!field.genres.includes(target.value)) {
        if (field.genres.length < 6) {
          setField((state) => ({
            ...state,
            genres: [...state.genres, target.value],
          }));
        } else {
          setError((error) => ({
            ...error,
            genre: "Only 6 genres allowed!",
          }));
        }
      }
    }
  };

  const handleDelGenre = (name) => {
    setField((state) => ({
      ...state,
      genres: state.genres.filter((g) => g !== name),
    }));
    setError((prevError) => ({
      ...prevError,
      genre: "",
    }));
  };

  const handleChangePlatforms = ({ target }) => {
    if (target.value !== "0") {
      if (!field.platforms.includes(target.value)) {
        if (
          field.platforms.length < 3 ||
          field.platforms.includes(target.value)
        ) {
          setField((state) => ({
            ...state,
            platforms: [...state.platforms, target.value],
          }));
        } else {
          setError((error) => ({
            ...error,
            platform: "Only 3 platforms allowed!",
          }));
        }
      }
    }
  };

  const handleDelPlatform = (name) => {
    setField((state) => ({
      ...state,
      platforms: state.platforms.filter((p) => p !== name),
    }));
    setError((error) => ({
      ...error,
      platform: "",
    }));
  };

  const platformsOptions = platforms
    ? platforms.map((p) => {
        return { label: p.name, value: p.name };
      })
      : [];
      
      //change image
      const [imageUrl, setImageUrl] = useState(placeholderImage);
    
      const handleChange = (e) => {
        setImageUrl(e.target.value);
      };
    
      const handleImageChange = () => {
        setField((state) => ({
          ...state,
          image: imageUrl,
        }));
      };
  //handle errors
  const handleBlur = () => {
    setError(validate(field));
  };

  //submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validate(field);
    if (Object.values(valid).every((err) => !err)) {
      dispatch(postNewGame(field))
        .then((response) => {
          if (response.payload && response.payload.id) {
            setTimeout(() => {
              dispatch(setStatus(""));
              navigate(`/videogames/add/${response.payload.id}`);
            }, 2000);
          } else {
            console.error("Invalid response from server:", response);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setError({ general: "An error occurred while saving the game." });
        });
    } else {
      setError(valid);
    }
  };

  return (
    <div>
      <NavBar search={false} />

      <div className="create">
        <div className="card-img">
          <img src={imageUrl} alt="Load..." />
        </div>
        <div className="input">
          <input
            type="text"
            value={imageUrl}
            onChange={handleChange}
            placeholder="Paste image URL here..."
          />
          <button onClick={handleImageChange}>Change image</button>
        </div>

        <div className="card-info">
          <div className="card-text">
            <h1>Create your videogame!</h1>
            <form onSubmit={handleSubmit} noValidate>
              {status && status !== "OK" ? <ErrorMessage msg={status} /> : ""}
              <div className="input">
                <input
                  type="text"
                  value={field.name}
                  name="name"
                  className="input-field"
                  required
                  onBlur={handleBlur}
                  onChange={(e) => setField({ ...field, name: e.target.value })}
                />
                <label className="input-label">Name</label>
                <label className="input-error">
                  {error.name && error.name}
                </label>
              </div>
              <div className="input">
                <input
                  type="text"
                  value={field.description}
                  name="description"
                  required
                  className="input-field"
                  onBlur={handleBlur}
                  onChange={(e) =>
                    setField({ ...field, description: e.target.value })
                  }
                />
                <label className="input-label">Description</label>
                <label className="input-error">
                  {error.description && error.description}
                </label>
              </div>

              <div className="input">
                <input
                  type="text"
                  placeholder="YYYY-MM-DD"
                  value={field.releaseDate}
                  name="releaseDate"
                  required
                  className="input-field"
                  onBlur={handleBlur}
                  onChange={(e) =>
                    setField({ ...field, releaseDate: e.target.value })
                  }
                />
                <label className="input-error">
                  {error.releaseDate && error.releaseDate}
                </label>
              </div>
              <div className="input">
                <input
                  type="text"
                  value={field.rating}
                  name="rating"
                  required
                  className="input-field"
                  onBlur={handleBlur}
                  onChange={(e) =>
                    setField({ ...field, rating: e.target.value })
                  }
                />
                <label className="input-label">Rating</label>
                <label className="input-error">
                  {error.rating && error.rating}
                </label>
              </div>

              <div className="input">
                <div className="input-select">
                  <select name="selectGenre" onChange={handleSelectChange}>
                    <option key="0" value="0">
                      Select genres...
                    </option>
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <label className="input-error-select">
                    {error.genre && error.genre}
                  </label>
                </div>
                <div>
                  {!field.genres.length
                    ? null
                    : field.genres.map((g) => (
                        <span className="genre-tag" key={g}>
                          {g}
                          <span
                            className="remove"
                            onClick={() => handleDelGenre(g)}>
                            x
                          </span>
                        </span>
                      ))}
                </div>
              </div>

              <div className="input">
                <div className="input-select">
                  <select
                    name="selectPlatform"
                    onChange={handleChangePlatforms}>
                    <option key="0" value="0">
                      Select platforms...
                    </option>
                    {platformsOptions.map((platform) => (
                      <option key={platform.value} value={platform.value}>
                        {platform.label}
                      </option>
                    ))}
                  </select>
                  <label className="input-error-select">
                    {error.platform && error.platform}
                  </label>
                </div>
                <div>
                  {!field.platforms.length
                    ? null
                    : field.platforms.map((p) => (
                        <span className="genre-tag" key={p}>
                          {p}
                          <span
                            className="remove"
                            onClick={() => handleDelPlatform(p)}>
                            x
                          </span>
                        </span>
                      ))}
                </div>
              </div>

              <div className="card-btn">
                <button
                  className="cancel"
                  type="button"
                  onClick={() => navigate("/videogames")}>
                  {status === "OK" ? "Return" : "Cancel"}
                </button>
                <button
                  className={
                    status === "OK" ? "success" : status !== "" ? "error" : ""
                  }
                  disabled={status === "OK"}
                  type="submit">
                  {status === "" ? (
                    "Save"
                  ) : status === "OK" ? (
                    <CheckOK />
                  ) : (
                    "Error!"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
