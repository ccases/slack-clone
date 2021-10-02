import React, { useEffect, useContext, useRef } from "react";
import ChatMsg from "./ChatMsg";
import * as UserAPI from "../../UserAPI";
import APIHeaders from "../../APIContext";
import "./ChatArea.css";

function ChatArea(props) {
  const { userId, userEmail, convo, setConvo, chatType } = props;
  const [header] = useContext(APIHeaders);
  const msgEnd = useRef(null);

  useEffect(() => {
    if (header["access-token"] === undefined || userId === undefined) {
      return;
    }
    setConvo([]); // reset all messages before going into the next one
    retrieveMsgs(userId, chatType);
  }, [userId, header]);

  useEffect(() => {
    scrollToBottom();
  }, [convo]);

  const scrollToBottom = () => {
    msgEnd.current.scrollIntoView({ behavior: "smooth" });
  };

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

  const messagesHeader = (userEmail) => {
    if (userEmail === header.uid)
      return (
        <div>
          <strong>This is your space.</strong> Draft messages, list your to-dos,
          or keep links and files handy. You can also talk to yourself here, but
          please bear in mind you’ll have to supply both sides of the
          conversation.
        </div>
      );

    return (
      <div>
        This is the very beginning of your direct message history with{" "}
        <button className="name">{userEmail}</button> Only the two of you are in
        this conversation, and no one else can join it.{" "}
        <a href="https://get.slack.help/hc/articles/360002063088">
          Learn more{" "}
        </a>
      </div>
    );
  };
  return (
    <div>
      {messagesHeader(userEmail)}
      <div>{displayMsgs} </div>
      <div style={{ visibility: "none" }} ref={msgEnd}></div>
    </div>
  );
}

export default ChatArea;
