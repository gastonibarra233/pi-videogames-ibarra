import React from "react";
import { Sort } from "../SvgIcons/SvgIcons";
import './Header.css'

//redux
import { getBySource, getByOrder } from "../../redux/gameSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
    const dispatch = useDispatch();
    const { source, order, searchName } = useSelector((state) => state.games);

  const handleOrder = ({ currentTarget }) => {
    const newOrder = {};
    newOrder[currentTarget.name] = currentTarget.value;
    dispatch(getByOrder(newOrder));
  };

  const handleSourceFilter = (source) => {
    dispatch(getBySource(source));
  };

  return (
    <div className="container">
      <div>
        <h1>
          GAMES
          {searchName ? <span> [{searchName}]</span> : ""}
        </h1>
      </div>

      <div>
        <label>Select source:</label>

        <label className="radio-input">
          <input
            type="radio"
            name="source"
            value="ALL"
            checked={source === "ALL"}
            onChange={() => handleSourceFilter("ALL")}
            onClick={() => handleSourceFilter("ALL")}
          />
          All
          <i></i>
        </label>
        <label className="radio-input">
          <input
            type="radio"
            name="source"
            value="API"
            checked={source === "API"}
            onChange={() => handleSourceFilter("API")}
          />
          API
          <i></i>
        </label>
        <label className="radio-input">
          <input
            type="radio"
            name="source"
            value="DB"
            checked={source === "DB"}
            onChange={() => handleSourceFilter("DB")}
          />
          DataBase
          <i></i>
        </label>
      </div>
      <div>
        <button
          title="Alphabetic order"
          name="ALPHABETIC"
          className={order.ALPHABETIC ? "active" : ""}
          value={order["ALPHABETIC"] === "ASC" ? "DESC" : "ASC"}
          onClick={handleOrder}
        >
          <Sort order={order["ALPHABETIC"]} />
          <span>Alphabetic</span>
        </button>

        <button
          title="Order by rating"
          name="RATING"
          className={order.RATING ? "active" : ""}
          value={order["RATING"] === "ASC" ? "DESC" : "ASC"}
          onClick={handleOrder}
        >
          <Sort order={order["RATING"]} />   
          <span>Rating</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
