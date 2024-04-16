import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Loading from '../Loading/Loading'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { Trash, CheckOK } from '../SvgIcons/SvgIcons'
import placeholder from '../../images/placeholder-joystick.png'
import './Detail.css'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { clearDetail, searchById } from '../../redux/gameSlice'
import Page404 from '../Page404/Page404'

const Detail = () => {
  const dispatch = useDispatch()
  const { idVideogame } = useParams()
  const navigate = useNavigate()

  const { detail: game, loading, status } = useSelector((state) => state.games)

  useEffect(() => {
    dispatch(searchById(idVideogame))
    return () => {
      dispatch(clearDetail())
    }
  }, [dispatch, idVideogame])
  
  return (
    <div>
      <NavBar search={false} />

      {loading ? (
        <Loading />
      ) : !game.name ? (
          status && status !== "OK" ? (
            status === "NOTFOUND" ? (
              <Page404 />
            ) : (
                <ErrorMessage msg={status} />
            )
          ) : (
              ""
          )
        ) : (
            <div className='card-detail'>
              <div className='card-image'>
                <img src={game.image ?? placeholder} alt={game.name} />
              </div>
              <div className='card-body'>
                <div className='card-info'>
                  <h1>{game.name}</h1>
                  <h2>
                    <span>Description: </span> {game.description}
                  </h2>

                  <div className='card-aditional'>
                    <div className='card-data'>
                      <div>
                        <h3>Release Date: </h3>{game.releaseDate}
                      </div>
                      <div>
                        <h3>Platforms: </h3>{game.platforms}
                      </div>
                      <div>
                        <h3>Genre: </h3> {game.genres}
                      </div>
                    </div>
                    <div className='card-genre'>
                      <h2>
                        <span>Genre:</span>
                      </h2>
                      {game.genres &&
                        game.genres.map((g) => (
                          <span className='genre-tag' key={g}>
                            {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              <div className='card-button'>
                <button type='button' onClick={() => navigate('/videogames')}>
                  Return
                      </button>
              </div>
              </div>
            </div>
      )}
      
    </div>
  )
}

export default Detail
