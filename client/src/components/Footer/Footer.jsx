import React from 'react'
import { Linkedin, Github } from '../SvgIcons/SvgIcons'
import './Footer.css'

const Footer = () => {
    return (
      <div className='container'>
        <span>Developed by Gastón Ibarra</span>
        <a
          href="https://www.linkedin.com/in/gast%C3%B3n-leonardo-ibarra-4b092a268/"
          title="LinkedIn"
          target="_blank"
          rel="noreferrer">
          <Linkedin />
        </a>
        <a
          href="https://github.com/gastonibarra233"
          title="GitHub"
          target="_blank"
          rel="noreferrer">
          <Github />
        </a>
      </div>
    );
}

export default Footer
