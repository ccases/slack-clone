import React, { useState, useEffect } from "react";
import ChatArea from "./ChatArea";
import ChatForm from "./ChatForm";
import "./Chat.css";

function Chat(props) {
  const { chat } = props;
  const [chatWith, setChatWith] = useState("");
  const [convo, setConvo] = useState([]);
  const [chatType, setChatType] = useState("User"); // can be Channel, CAPITALIZE FIRST LETTER!

  useEffect(() => {
    if (!chat) return;
    if (chat["owner_id"] !== undefined) {
      // if object passed has owner id, set chat type to channel!
      setChatType("Channel");
    } else if (chat["email"] !== undefined) {
      // if chat has property: email, single user lang siya
      setChatType("User");
      setChatWith(chat);
    }
  }, [chat]);

  useEffect(() => {
    console.log(`Chatwith: ${chatWith.uid} ${chatWith.id}`);
  }, [chatWith]);

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
