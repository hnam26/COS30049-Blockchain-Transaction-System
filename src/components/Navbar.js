import React from "react";
import basicLogo from "../assets/images/basic-logo.png";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={basicLogo} alt="Swinburne logo" />
      </div>
      <div className="right-side">

      <ul className="navbar-links">
        <li>Sell</li>
        <li>Buy</li>
        <li>Rent</li>
      </ul>
      <div className="navbar-actions">
      {/* <span className="mas">Sign in</span> */}
        <button className="sign-in-button">Sign in</button>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;