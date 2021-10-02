import React from "react";
import "./ChatMsg.css";

function ChatMsg(props) {
  const { sender, time, msg } = props;

  const formatTime = (time) => {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let dateReceived = new Date(time);
    let dispString = "";
    let hrs = dateReceived.getHours();
    let mins = dateReceived.getMinutes();
    dispString += `${
      hrs > 12 && hrs < 24 ? hrs - 12 : hrs === 0 ? hrs + 12 : hrs
    }`;
    dispString += `:${mins < 10 ? "0" + mins : mins} `;
    if (hrs >= 12) dispString += "PM";
    else dispString += "AM";
    // if (dateReceived.getDate() === today.getDate()) {
    //   dispString += "Today at ";
    // } else if (dateReceived.getDate() === today.getDate() - 1) {
    //   dispString += "Yesterday at ";
    // } else {
    //   dispString += `${
    //     month[dateReceived.getMonth()]
    //   } ${dateReceived.getDate()}, ${day[dateReceived.getDay()]} at `;
    // }
    return dispString;
  };

  return (
    <div className="container">
      <div className="avatarContainer">A</div>
      <div className="msgWrapper">
        <div className="titleWrapper">
          <p className="sender">
            <strong>{sender}</strong>
          </p>
          <p className="time">{formatTime(time)}</p>
        </div>
        <div className="body">{msg}</div>
      </div>
    </div>
  );
}

export default ChatMsg;
