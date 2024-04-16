import React from 'react'
import NavBar from '../NavBar/NavBar'
import image from '../../images/videogame.png'
import './About.css'

const About = () => {
  return (
      <div>
          <NavBar/>
          <div className='container-about'>
              <h1>Individual Project</h1>
              <h1>Gastón Ibarra</h1>
              <div className='div-foto'>
                  <img src={image} alt="foto" />
              </div>
      </div>
    </div>
  )
}

export default About
