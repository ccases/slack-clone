import React, { useState, useEffect, useContext } from "react";
import ChatMsg from "./ChatMsg";
import * as UserAPI from "../../UserAPI";
import APIHeaders from "../../APIContext";

function ChatArea() {
  const [header, setHeader] = useContext(APIHeaders);
  const [userId, setUserId] = useState(-1);
  const [convo, setConvo] = useState();

  useEffect(() => {
    if (header["access-token"] === undefined) return;
    setUserId(474);
    retrieveMsgs(userId);
  }, [header, userId, convo]);

  const retrieveMsgs = (userId) => {
    if (userId === -1) return;

    UserAPI.getMsgs(header, userId)
      .then((res) => {
        setConvo(res.data.data); // hah idk bakit ganito pero mukhang ok naman
        console.log(convo);
      })
      .catch((e) => console.log(e));
  };
  const displayMsgs = convo.map((msg) => (
    <ChatMsg
      key={msg.id}
      sender={msg.sender.uid}
      msg={msg.body}
      time={msg.created_at}
    />
  ));

  return (
    <div>
      Chatting with: testestest@hello.com, ID 474 as testhello@test.com
      <div>{displayMsgs} </div>
    </div>
  );
}

export default ChatArea;
