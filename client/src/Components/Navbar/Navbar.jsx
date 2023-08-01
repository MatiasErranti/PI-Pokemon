import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='nav-cont'>
      <div className='div-links'>    
        <Link to="/home" className='home'>Home</Link>
        <Link to="/formulario" className='home'>Create</Link>
      </div>
      <div className='nav-img'>
        <Link to='/'><img src='http://img08.deviantart.net/860a/i/2012/308/0/b/__hd___pokemon_logo___hd___by_peetzaahhh2010-d5k08gz.png' alt="picapica" /></Link>
      </div>
    </div>
  )
}

export default Navbar