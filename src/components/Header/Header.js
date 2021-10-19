import React from "react";
import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";
import Logout from "../Logout/Logout";
import { FiClock } from "react-icons/fi";

function Header({ userDb, channelDb, setChat, setUserDb }) {
  return (
    <div className="header">
      <FiClock 
       style={{
        fontSize: "18px",
        color: "white",
        }}/>
      <SearchBar
        userDb={userDb}
        setUserDb={setUserDb}
        channelDb={channelDb}
        setChatWith={setChat}
      />
      <Logout />
    </div>
  );
}

export default Header;
