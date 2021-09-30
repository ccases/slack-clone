import React, { useState, useEffect, useContext } from "react";
import ChatMsg from "./ChatMsg";
import * as UserAPI from "../../UserAPI";
import APIHeaders from "../../APIContext";

function ChatArea(props) {
  const { userId, userEmail } = props;
  const [header, setHeader] = useContext(APIHeaders);
  const [convo, setConvo] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (header["access-token"] === undefined && userId === undefined) {
      setIsLoggedIn(false);
      return;
    }
    setIsLoggedIn(true);
    retrieveMsgs(userId);
  }, [userId, header]);

  const retrieveMsgs = (userId) => {
    if (userId === -1 || !isLoggedIn) {
      return;
    }

    UserAPI.getMsgs(header, userId)
      .then((res) => {
        setConvo(res.data.data); // hah idk bakit ganito pero mukhang ok naman
        console.log(convo);
      })
      .catch((e) => console.log(e));
  };
  const displayMsgs = convo
    ? convo.map((msg) => (
        <ChatMsg
          key={msg.id}
          sender={msg.sender.uid}
          msg={msg.body}
          time={msg.created_at}
        />
      ))
    : null;

  return (
    <div>
      Chatting with: {userEmail}, ID {userId} as testhello@test.com
      <div>{displayMsgs}</div>
    </div>
  );
}

export default ChatArea;
