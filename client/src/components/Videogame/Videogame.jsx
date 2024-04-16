import React from 'react'
import { Link } from 'react-router-dom'
import photo from '../../images/created.jpg'
import './Videogame.css'

const Videogame = (props) => {
  return (
    <div className="container-game">
      <div className="title-game">{props.name}</div>
      <div className="game-div">
        {props.background_image ? (
          <img src={`${props.background_image}`} alt="Videogame" className="Img" />
        ) : (
          <img src={photo} alt="Videogame" className="Img" />
        )}
      </div>
      <div className="infoRating">
        {
          <p>
            <strong>Rating</strong>: ★ {`${props.rating}`}
          </p>
        }
      </div>
          <div className="infoContGenres">
              {
                  <p className=''>
                      <strong>Genres:</strong>{' '}
                      {`${
                          typeof props.genres === 'string'
                          ? props.genres
                          : props.genres.join(', ')
                      }`}
                  </p>
              }
      </div>
          <div className="div-button">
              {props.id && (
                  <Link to={`/videogame/${props.id}`}>
                      <button className='Link'>Details</button>
                  </Link>
              )}
      </div>
    </div>
  );
}

export default Videogame
