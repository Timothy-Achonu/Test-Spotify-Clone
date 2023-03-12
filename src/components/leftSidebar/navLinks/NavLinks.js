import React from "react";
import styles from "./navLinks.module.css";
import { NavLink } from "react-router-dom";

export default function NavLinks({ icon, text, isPlayLists, setPlaylist }) {
  return (
    <li>
      <NavLink
        to={`/${
          text === "Home"
            ? ""
            : isPlayLists
            ? "playlist/" + text.toLowerCase()
            : text.toLowerCase()
        }`}
        onClick={ setPlaylist }
      >
        <div>
          <span>{icon}</span>
          <span>{text}</span>
        </div>
      </NavLink>
    </li>
  );
}
