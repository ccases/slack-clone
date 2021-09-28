import React, { useState, useEffect, useContext } from "react";
import ChatMsg from "./ChatMsg";
import * as UserAPI from "../../UserAPI";
import APIHeaders from "../../APIContext";

function ChatArea(props) {
  const { userId } = props;
  const [header, setHeader] = useContext(APIHeaders);
  const [convo, setConvo] = useState([]);

  useEffect(() => {
    if (header["access-token"] === undefined) return;
    retrieveMsgs(userId);
  }, [userId, header, convo]);

  const retrieveMsgs = (userId) => {
    if (userId === -1) return;

    UserAPI.getMsgs(header, userId)
      .then((res) => {
        console.log("retrieveMsgs");
        console.log(res.data.data);
        console.log("Convo");
        console.log(convo);
        if (res.data.data.length === convo.length) {
          console.log("Nochange");
          setTimeout((userId) => {
            retrieveMsgs(userId);
          }, 2000);
          return;
        } else {
          console.log("di pumasok");
        }
        setConvo(res.data.data); // hah idk bakit ganito pero mukhang ok naman
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
