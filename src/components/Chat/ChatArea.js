import React, { useEffect, useState, useRef } from "react";
import ChatMsg from "./ChatMsg";
import * as UserAPI from "../../UserAPI";
import Headers from "../../Helpers/Headers";
import "./ChatArea.css";
import Avatar from "../Avatar/Avatar";

function ChatArea(props) {
  const {
    userId,
    userEmail,
    convo,
    setConvo,
    chatType,
    userDb,
    chat,
    setRecentDms,
  } = props;
  const [header] = useState(Headers);
  const msgEnd = useRef(null);
  const [prevLen, setPrevLen] = useState("");

  useEffect(() => {
    if (header["access-token"] === undefined || userId === undefined) {
      return;
    }
    setConvo([]); // reset all messages before going into the next one
    retrieveMsgs(userId, chatType, false);
  }, [userId, header]);
  useEffect(() => {
    if (header["access-token"] === undefined || userId === undefined) {
      return;
    }
    setConvo([]); // reset all messages before going into the next one
    retrieveMsgs(userId, chatType, false);

    let clen = convo.length;
    if (clen > 1) {
      setPrevLen(clen);
    }
  }, []);

  useEffect(() => {
    let clen = convo.length;
    if (clen > 1) {
      if (prevLen !== clen) {
        scrollToBottom();
        setPrevLen(clen);
      }
    }
  }, [chat, convo]);

  useEffect(() => {
    // enables "real time" chat!!!! w/ 2 sec delay
    if (header["access-token"] === undefined || userId === undefined) {
      return;
    }

    const interval = setInterval(() => {
      retrieveMsgs(userId, chatType, true);
      UserAPI.getRecent(header)
        .then((res) => {
          setRecentDms(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }, 3000);

    return () => clearInterval(interval);
  }, [userId, chatType]);

  const scrollToBottom = () => {
    console.log("SCROLL");
    msgEnd.current.scrollIntoView({ behavior: "smooth" });
  };
  // checker if same day, or wihtin a certain timeframe
  // helper for map functions
  const timeChecker = (arr, idx) => {
    let isWithin3Mins = false;
    let isSameDay = false;

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
        if (arr[idx].sender.uid !== arr[idx - 1].sender.uid) {
          return [isSameDay, isWithin3Mins];
        }
        if (currentMsgTime - prevMsgTime <= 180000) {
          isWithin3Mins = true;
        }
      }
    }
    return [isSameDay, isWithin3Mins];
  };

  const retrieveMsgs = (userId, chatType, isChecking = false) => {
    UserAPI.getMsgs(header, userId, chatType).then((res) => {
      let len = res.data.data.length;
      let convoLen = convo.length;
      if (len !== convoLen) {
        setConvo(res.data.data);
      }
    });
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
    let date = new Date(chat.created_at); // for channels lang to
    let monthStr = date.toLocaleDateString("default", { month: "long" });
    let day = date.getDate();
    let channelOwner = "";
    // set up for channel
    if (chatType === "Channel" && chat.owner_id) {
      channelOwner = userDb.find((user) => user.id === chat.owner_id).uid;
    }
    if (userEmail === header.uid)
      return (
        <div className="messages-header">
          <div className="messages-header-top-part">
            <Avatar user={chat} size={60} />
            <p>
              <strong>{chat.uid}</strong> (you)
            </p>
          </div>
          <strong>This is your space.</strong> Draft messages, list your to-dos,
          or keep links and files handy. You can also talk to yourself here, but
          please bear in mind you’ll have to supply both sides of the
          conversation.
        </div>
      );
    else if (chatType === "User")
      return (
        <div className="messages-header">
          <div className="messages-header-top-part">
            <Avatar user={chat} size={60} />
            <p>
              <strong>{chat.uid}</strong>
            </p>
          </div>
          This is the very beginning of your direct message history with{" "}
          <button className="name">{userEmail}</button> Only the two of you are
          in this conversation, and no one else can join it.{" "}
          <a href="https://get.slack.help/hc/articles/360002063088">
            Learn more{" "}
          </a>
        </div>
      );
    else if (chatType === "Channel")
      return (
        <div className="messages-header">
          <button className="name">{channelOwner}</button> created this on{" "}
          {monthStr} {day}. This is the very beginning of{" "}
          <strong>{chat.name}</strong> channel.
        </div>
      );
  };
  return (
    <div className="ChatArea ">
      <div className="chat-wrapper">
        {messagesHeader(userEmail)}
        <div>{displayMsgs} </div>
        <div
          style={{ visibility: "none", height: "0px", width: "0px" }}
          ref={msgEnd}
        ></div>
      </div>
    </div>
  );
}

export default ChatArea;
