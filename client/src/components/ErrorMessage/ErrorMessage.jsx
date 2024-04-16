import React from 'react'
import './ErrorMessage.css'

const ErrorMessage = ({msg}) => {
  return (
      <div className='message'>{msg}</div>
  )
}

export default ErrorMessage
