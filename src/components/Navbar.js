import React, { useState } from "react";
import { Link } from "react-router-dom";
import basicLogo from "../assets/images/basic-logo.png";
import "../styles/navbar.css";

// Navbar component
const Navbar = () => {
  // State for managing menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  // Render Navbar component
  return (
    <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
      {/* Swinburne logo */}
      <div className="navbar-logo">
        <Link to="/">
          <img src={basicLogo} alt="Swinburne logo" />
        </Link>
      </div>

      {/* Right-side navigation and menu toggle */}
      <div className="right-side">
        {/* Hamburger menu icon */}
        <div className={`navbar-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Navigation links */}
        <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li>
            <button className="sign-in-button">Sign in</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// Export Navbar component
export default Navbar;
