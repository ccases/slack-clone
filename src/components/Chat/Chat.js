import React, { useState, useEffect } from "react";
import ChatArea from "./ChatArea";
import ChatForm from "./ChatForm";
import { UserDbContext, ChatContext } from "../../Services/UserContexts";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import { useContext } from "react/cjs/react.development";

function Chat(props) {
  const { recentDms, setRecentDms } = props;
  const [chatWith, setChatWith] = useState("");
  const [convo, setConvo] = useState([]);
  const [chatType, setChatType] = useState("User"); // can be Channel, CAPITALIZE FIRST LETTER!

  const [chat, setChat] = useContext(ChatContext);
  const [userDb, setUserDb] = useContext(UserDbContext);

  useEffect(() => {
    if (!chat) return;
    if (chat["owner_id"] !== undefined) {
      // if object passed has owner id, set chat type to channel!
      setChatType("Channel");
      setChatWith(chat);
    } else if (chat["email"] !== undefined) {
      // if chat has property: email, single user lang siya
      setChatType("User");
      setChatWith(chat);
    }
  }, [chat]);

  return (
    <div className="chat">
      <div className="chat-header">
        <ChatHeader chat={chat} chatType={chatType} />
      </div>
      <ChatArea
        userId={chatWith.id}
        userEmail={chatWith.uid}
        convo={convo}
        setConvo={setConvo}
        chatType={chatType}
        recentDms={recentDms}
        setRecentDms={setRecentDms}
      />
      <ChatForm
        userId={chatWith.id}
        setConvo={setConvo}
        convo={convo}
        userEmail={chatWith.uid}
        chatType={chatType}
      />
    </div>
  );
}

export default Chat;
