import React from 'react';
import { Link } from 'react-router-dom'; // Importez Link
import logo from '../assets/Logo.png';

function Navbar() {
  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <img src={logo} alt='logo' style={{width: '50px'}} />
      </div>
      <div className='navbar-right'>
        <Link to="/favorites"><button>Favoris</button></Link>
        <Link to="/contact"><button>Contacter</button></Link>
        <Link to="/about"><button>A propos</button></Link>
      </div>
    </div>
  );
}

export default Navbar;