import { useEffect } from "react";
import Videogame from "../Videogame/Videogame";
import Loading from "../Loading/Loading";
import EmptyData from "../EmptyData/EmptyData";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./Videogames.css";

//redux
import { fetchAllGames, setCurrentPage } from "../../redux/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";

const Videogames = () => {
  const dispatch = useDispatch();
  const {
    list,
    filtered: games,
    currentPage,
    loading,
    status,
    searchName,
  } = useSelector((state) => state.games);

  //pagination
  const countPerPage = 8;
  const firstIdx = (currentPage - 1) * countPerPage;
  const lastIdx = firstIdx + countPerPage;
  const gamesFlat = games.flat()
  const listFlat = list.flat()

  const page = gamesFlat.slice(firstIdx, lastIdx)

  useEffect(() => {
    if (!listFlat.length && !searchName) {
      dispatch(fetchAllGames());
    }
  }, [dispatch, listFlat, searchName]);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  return (
    <div className="container">
      {loading ? (
        <Loading />
      ) : !gamesFlat.length ? (
        status ? (
          status === "NOTFOUND" ? (
            <EmptyData />
          ) : (
            <ErrorMessage msg={status} />
          )
        ) : (
          <EmptyData />
        )
      ) : (
        <>
              {page.map((game) => (
                <Videogame key={game.id} {...game} />
              ))}

          <Pagination
            handleChange={handlePageChange}
            totalItems={gamesFlat.length}
            currentPage={currentPage}
            countPerPage={countPerPage}
            />
        </>
      )}
    </div>
  );
};

export default Videogames;
