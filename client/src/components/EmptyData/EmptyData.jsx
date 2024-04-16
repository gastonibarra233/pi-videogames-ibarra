import React from 'react'
import looking from '../../images/conecting.gif'
import './EmptyData.css'

const EmptyData = () => {
  return (
    <div className='empty-data'>        
              <h3>There're no games with this criteria...</h3>
      <h2>Create your own!</h2>
      <img src={looking} alt="looking..." />
    </div>
  )
}

export default EmptyData
