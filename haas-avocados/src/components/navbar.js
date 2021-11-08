import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'
import avacado from '../avacado_logo.png'

function Navbar({ isAuth, logout }) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Avacad
            <img className='navbar-avacado' src={avacado}/>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>

            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/dashboard'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Dashboard
              </Link>
            </li>
    
            <li className='nav-item'>
              <Link
                to='/projects'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Projects
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/datasets'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Datasets
              </Link>
            </li>

            {
              isAuth ?
              <li className='nav-item'>
                <Link
                  to='/logout'
                  className='nav-links'
                  onClick={() => {
                    closeMobileMenu();
                    logout();
                  }}
                >
                  Logout
                </Link>
              </li>
              : <li className='nav-item'>
                <Link
                  to='/login'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
            }
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;