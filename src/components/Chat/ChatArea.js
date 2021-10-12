import React, { useEffect, useState, useRef } from "react";
import ChatMsg from "./ChatMsg";
import * as UserAPI from "../../UserAPI";
import Headers from "../../Helpers/Headers";
import "./ChatArea.css";
import ChatHeader from "./ChatHeader"


function ChatArea(props) {
  const { userId, userEmail, convo, setConvo, chatType, userDb, } = props;
  const [header] = useState(Headers);
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
  // checker if same day, or wihtin a certain timeframe
  // helper for map functions
  const timeChecker = (arr, idx) => {
    let isWithin3Mins = false;
    let isSameDay = false;

    // if()
    if (idx !== 0) {
      let currentMsgTime = new Date(arr[idx].created_at);
      let prevMsgTime = new Date(arr[idx - 1].created_at);
      let curr = {
        date: currentMsgTime.getDate(),
        month: currentMsgTime.getMonth(),
        year: currentMsgTime.getFullYear(),
      };
      let prev = {
        date: prevMsgTime.getDate(),
        month: prevMsgTime.getMonth(),
        year: prevMsgTime.getFullYear(),
      };

      if (
        curr.date === prev.date &&
        curr.month === prev.month &&
        curr.year === prev.year
      ) {
        isSameDay = true;
        if (currentMsgTime - prevMsgTime <= 180000) {
          isWithin3Mins = true;
        }
      }
    }
    return [isSameDay, isWithin3Mins];
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
    ? convo.map((msg, idx, arr) => {
        let [isSameDay, isWithin3Mins] = timeChecker(arr, idx);
        if (idx % 2 === 0)
          return (
            <ChatMsg
              key={msg.id}
              sender={msg.sender}
              msg={msg.body}
              time={msg.created_at}
              isSameDay={isSameDay}
              isWithin3Mins={isWithin3Mins}
            />
          );
        else return null;
      })
    : convo.map((msg, idx, arr) => {
        let [isSameDay, isWithin3Mins] = timeChecker(arr, idx);
        return (
        
          <ChatMsg
            key={msg.id}
            sender={msg.sender}
            msg={msg.body}
            time={msg.created_at}
            isSameDay={isSameDay}
            isWithin3Mins={isWithin3Mins}
          />
        );
      });

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
    <div className="ChatArea ">
      {/* <div className="chat-wrapper"> */}
      {messagesHeader(userEmail)}
      <div>{displayMsgs} </div>
      <div style={{ visibility: "none" }} ref={msgEnd}></div>
      {/* </div> */}
    </div>
  );
}

export default ChatArea;
