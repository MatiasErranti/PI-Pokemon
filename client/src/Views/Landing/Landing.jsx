import React from 'react'
import './landing.css'
import { Link } from 'react-router-dom'


const Landing = () => {



  return (
    <div className='div-open'>
      <div className='div-button'>
        <Link className='link'to={'/home'}><button>START</button></Link>
      </div>
    </div>
  )
}

export default Landing