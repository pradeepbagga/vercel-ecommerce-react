import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header-container'>
      <h2><Link to="/">MERN E-Commerce</Link></h2>
      <nav>
        <Link to="/create-product">Create Product</Link>
      </nav>
    </div>
  )
}

export default Header