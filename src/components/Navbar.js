import React from "react";
// import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">SWIN BUR .NE</div>
      <ul className="navbar-links">
        <li>Sell</li>
        <li>Buy</li>
        <li>Rent</li>
      </ul>
      <div className="navbar-actions">
        <button className="sign-in-button">Sign in</button>
      </div>
    </nav>
  );
};

export default Navbar;