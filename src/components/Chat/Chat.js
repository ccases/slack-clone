import React, { useState, useEffect, useContext } from "react";
import ChatArea from "./ChatArea";
import ChatForm from "./ChatForm";
import SearchBar from "../SearchBar/SearchBar";
import "./Chat.css";
import * as UserAPI from "../../UserAPI";
import APIHeaders from "../../APIContext";

function Chat() {
  const [header, setHeader] = useContext(APIHeaders);
  const [chatWith, setChatWith] = useState("");
  const [userSearch, setUserSearch] = useState("");

  const submitHandler = () => {
    // get ID ng sesendan pati username
  };
  return (
    <div>
      {/* <button onClick={clickHandler}>Get Chat</button> */}
      {/* <SearchBar type="user" placeholder="Type an email..." /> */}
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={userSearch}
          onChange={(e) => {
            setUserSearch(e.target.value);
          }}
          placeholder="Search Avion School"
        />
        <input type="submit" value="search" />
      </form>
      <ChatArea userId={474} />
      <ChatForm />
    </div>
  );
}

export default Chat;
