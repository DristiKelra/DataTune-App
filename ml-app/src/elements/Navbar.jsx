// import React, { useState } from "react";

// import "./Navbar.css";
// import { Link, NavLink } from "react-router-dom";

// export const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav>
//       <Link to="/" className="title">
//         DataTune
//       </Link>
//       <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
//       <ul className={menuOpen ? "open" : ""}>
//         <li>
//           <NavLink to="/">Home</NavLink>
//         </li>
//         <li>
//           <NavLink to="/about">About</NavLink>
//         </li>
//         <li>
//           <NavLink to="/services">Services</NavLink>
//         </li>
//         <li>
//           <NavLink to="/contact">Contact</NavLink>
//         </li>
//         <li>
//           <NavLink to="/Data">Data</NavLink>
//         </li>
//         <li>
//           <NavLink to="/Login">Login</NavLink>
//         </li>
//       </ul>
//     </nav>
//   );
// };