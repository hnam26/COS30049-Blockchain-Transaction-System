import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import basicLogo from "../assets/images/basic-logo.png";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Wrap the image inside an <a> tag */}
        <Link to="/">
          <img src={basicLogo} alt="Swinburne logo" />
        </Link>
      </div>
      <div className="right-side">
        <ul className="navbar-links">
          <li>Sell</li>
          <li>Buy</li>
          <li>Rent</li>
        </ul>
        <div className="navbar-actions">
          <button className="sign-in-button">Sign in</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
