import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">KitVault</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/collection">My Kits</Link></li>
        <li><Link to="/stats">Stats</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
