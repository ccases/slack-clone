import React, { useEffect, useContext } from "react";
import ChatMsg from "./ChatMsg";
import * as UserAPI from "../../UserAPI";
import APIHeaders from "../../APIContext";

function ChatArea(props) {
  const { userId, userEmail, convo, setConvo, chatType } = props;
  const [header] = useContext(APIHeaders);

  useEffect(() => {
    if (header["access-token"] === undefined || userId === undefined) {
      return;
    }
    setConvo([]); // reset all messages before going into the next one
    retrieveMsgs(userId, chatType);
  }, [userId, header]);

  const retrieveMsgs = (userId, chatType) => {
    UserAPI.getMsgs(header, userId, chatType)
      .then((res) => {
        setConvo(res.data.data); // res (an object) has property named data (also an object), and data has data hence this
      })
      .catch((e) => console.log("Failed to fetch messages"));
  };
  const displayMsgs = !convo
    ? "Loading messages..."
    : header.uid === userEmail
    ? convo.map((msg, idx) => {
        if (idx % 2 === 0)
          return (
            <ChatMsg
              key={msg.id}
              sender={msg.sender.uid}
              msg={msg.body}
              time={msg.created_at}
            />
          );
        else return null;
      })
    : convo.map((msg) => (
        <ChatMsg
          key={msg.id}
          sender={msg.sender.uid}
          msg={msg.body}
          time={msg.created_at}
        />
      ));

  return (
    <div>
      Chatting with: {userEmail}, ID {userId} as {header.uid}
      <div>{displayMsgs} </div>
    </div>
  );
}

export default ChatArea;
