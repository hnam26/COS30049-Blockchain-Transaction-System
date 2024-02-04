import React, { useState } from "react";
import { Link } from "react-router-dom";
import basicLogo from "../assets/images/basic-logo.png";
import "../styles/navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState); // Use functional update form of setState
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
      <div className="navbar-logo">
        <Link to="/">
          <img src={basicLogo} alt="Swinburne logo" />
        </Link>
      </div>
      <div className="right-side">
        <div className={`navbar-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li>
            <button className="sign-in-button">Sign in</button> {/* Add sign-in button here */}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
