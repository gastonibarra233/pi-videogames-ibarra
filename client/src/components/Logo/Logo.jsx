import React from 'react'
import logo from '../../images/placeholder-joystick.png'
import './Logo.css'

const Logo = () => {
  return (
    <div className='container'>
          <a href="/videogames">
              <img src={logo} alt="logo" />
              <span>Videogames</span>
      </a>
    </div>
  )
}

export default Logo
