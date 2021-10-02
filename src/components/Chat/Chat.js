import React, { useState, useEffect, useContext } from "react";
import ChatArea from "./ChatArea";
import ChatForm from "./ChatForm";
import SearchBar from "../SearchBar/SearchBar";
import "./Chat.css";
import * as UserAPI from "../../UserAPI";
import APIHeaders from "../../APIContext";
import axios from "axios";

function Chat() {
  const [header, setHeader] = useContext(APIHeaders);
  const [chatWith, setChatWith] = useState("");
  const [convo, setConvo] = useState([]);
  const [chatType, setChatType] = useState("User"); // can be Channel, CAPITALIZE FIRST LETTER!

  useEffect(() => {
    console.log(`Chatwith: ${chatWith.uid} ${chatWith.id}`);
  }, [chatWith]);
  // LOG IN BUTTON LANG DITO FOR TESTING AND GET USERS - START
  const logIn = () => {
    const url = "http://206.189.91.54//api/v1/auth/";

    axios
      .post(url + "sign_in", {
        email: "testhello@test.com",
        password: "Hello12345",
      })
      .then((res) => {
        console.log("success: " + res);
        setHeader({
          "access-token": res.headers["access-token"],
          client: res.headers["client"],
          expiry: res.headers["expiry"],
          uid: res.headers["uid"],
        });

        console.log("headers: " + header);
        console.log("res.headers: " + res.headers["access-token"]);
      })
      .catch((e) => {
        console.log("error: " + e);
      });
  };

  const recentlyDms = () => {
    UserAPI.getRecent(header)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log("What is recently DMS");
      });
  };
  // LOG IN BUTTON LANG DITO FOR TESTING AND GET USERS - END

  // logIn();

  return (
    <div>
      <button onClick={logIn}> Login </button>
      <button onClick={recentlyDms}> RecentlyDms </button>

      <SearchBar placeholder="Search Avion School" setChatWith={setChatWith} />
      <ChatArea
        userId={chatWith.id}
        userEmail={chatWith.uid}
        convo={convo}
        setConvo={setConvo}
        chatType={chatType}
      />
      <ChatForm
        userId={chatWith.id}
        setConvo={setConvo}
        convo={convo}
        userEmail={chatWith.uid}
      />
    </div>
  );
}

export default Chat;
