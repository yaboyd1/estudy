import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={require('./imgs/estudy_logo.png')} alt="logo" />
        </Link>
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup ">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;
