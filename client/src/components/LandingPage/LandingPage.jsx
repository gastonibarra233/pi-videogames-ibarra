import React from 'react'
import { Link } from 'react-router-dom'
import background from '../../images/arcade-background.gif'
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div className='MyImage'>
          <img className='theImage' src={background} alt="" />
          <Link to='/videogames'>
          <button className='myButton'>INSERT COIN</button>
          </Link>
    </div>
  )
}

export default LandingPage
