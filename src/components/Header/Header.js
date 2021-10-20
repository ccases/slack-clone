import React from "react";
import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";
import Logout from "../Logout/Logout";
import { FiClock } from "react-icons/fi";

function Header() {
  return (
    <div className="header">
      <FiClock
        style={{
          fontSize: "18px",
          color: "white",
        }}
      />
      <SearchBar />
      <Logout />
    </div>
  );
}

export default Header;
