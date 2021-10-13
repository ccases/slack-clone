import React from "react";
import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResult from "../SearchBar/SearchResult";
import { FiClock } from "react-icons/fi";

function Header({ userDb, channelDb, setChat, setUserDb }) {
  return (
    <div className="header">
      <FiClock />
      <SearchBar
        userDb={userDb}
        setUserDb={setUserDb}
        channelDb={channelDb}
        setChatWith={setChat}
      />
      <SearchResult />
    </div>
  );
}

export default Header;
