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

  useEffect(() => {});
  const clickHandler = () => {
    UserAPI.getMsgs(header, 474)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  return (
    <div>
      {/* <button onClick={clickHandler}>Get Chat</button> */}
      {/* <SearchBar type="user" placeholder="Type an email..." /> */}
      <ChatArea />
      <ChatForm />
    </div>
  );
}

export default Chat;
