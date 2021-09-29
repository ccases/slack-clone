import React, { useState, useEffect, useContext } from "react";
import ChatArea from "./ChatArea";
import ChatForm from "./ChatForm";
import SearchBar from "../SearchBar/SearchBar";
import "./Chat.css";
import * as UserAPI from "../../UserAPI";
import APIHeaders from "../../APIContext";
import AllUsers from "../../AllUsersContext";

function Chat() {
  const [header, setHeader] = useContext(APIHeaders);
  const [allUsers, setAllUsers] = useContext(AllUsers);
  const [chatWith, setChatWith] = useState("");
  const [userSearch, setUserSearch] = useState("");

  const submitHandler = () => {
    // get ID ng sesendan pati username
    const foundUser = allUsers.find((user) => user.uid === userSearch);
    if (foundUser) {
      setChatWith(foundUser);
    } else {
      alert("No users with the given email!");
    }
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
        <input type="submit" value="Search" />
      </form>
      <ChatArea userId={chatWith.id} />
      <ChatForm userId={chatWith.id} />
    </div>
  );
}

export default Chat;
