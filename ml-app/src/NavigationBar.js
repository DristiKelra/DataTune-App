// src/NavigationBar.js
import React from "react";
import { Link } from "react-router-dom";
import "./styles.css"

function NavigationBar() {
  return (
    <nav classname ="nav">
      <a href = "/" className ="Site-title">Data Tune</a>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
