import React from "react";
import { NavLink } from "react-router-dom";

//styles
import "../styles/TheNavigation.scss";

function TheNavigation() {
  return (
    <nav className="navigation">
      <NavLink to="/">Todo list</NavLink>
    </nav>
  );
}
export default TheNavigation;
