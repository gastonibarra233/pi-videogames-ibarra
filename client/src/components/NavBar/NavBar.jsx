import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import Logo from '../Logo/Logo'
import './NavBar.css'

//redux
import { clearGames } from '../../redux/gameSlice'
import { clearGenres } from '../../redux/genreSlice'
import { useDispatch } from 'react-redux'

const NavBar = ({ search }) => {
  const dispatch = useDispatch()
  const handleLogOut = () => {
    dispatch(clearGenres())
    dispatch(clearGames())
  }
  return (
    <div className='navigation'>
      <Logo />
      
      {search && (
        <>
          <SearchBar />
          <Link to='/crearjuego' className='nav-link'>
            Create New Videogame
          </Link>
        </>
      )}

      <Link to='/' onClick={handleLogOut}>
        Landing Page
      </Link>
    </div>
  )
}

export default NavBar
