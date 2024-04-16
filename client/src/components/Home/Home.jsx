import React from 'react'
import NavBar from '../NavBar/NavBar'
import Videogames from '../Videogames/Videogames'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './Home.css'

const Home = () => {
  return (
    <div>
          <NavBar search={true} />
          
          <div className='layout'>
              <Header />
              <Videogames />
          </div>

          <Footer />
    </div>
  )
}

export default Home
