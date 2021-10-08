import React, { useState, useEffect } from "react";
import ChatArea from "./ChatArea";
import ChatForm from "./ChatForm";
import "./Chat.css";
import * as UserAPI from "../../UserAPI";
import Headers from "../../Helpers/Headers";
import axios from "axios";

function Chat(props) {
  const { chat } = props;
  const [header, setHeader] = useState(Headers);
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
    <div className="chat">
      <div className="chat-area-wrapper">
        <ChatArea
          userId={chatWith.id}
          userEmail={chatWith.uid}
          convo={convo}
          setConvo={setConvo}
          chatType={chatType}
        />
      </div>
      <div>
        <ChatForm
          userId={chatWith.id}
          setConvo={setConvo}
          convo={convo}
          userEmail={chatWith.uid}
          chatType={chatType}
        />
      </div>
    </div>
  );
}

export default Chat;
