import React, { useState } from "react";
import "./ChatMsg.css";
import { FaAngleDown } from "react-icons/fa";

function ChatMsg(props) {
  const { sender, time, msg, isSameDay, isWithin3Mins } = props;
  const [month] = useState([
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
  ]);
  const [day] = useState([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);
  const formatTime = (time) => {
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
    return dispString;
  };

  const formatDay = (time, day, month) => {
    let dateRx = new Date(time);
    let yMonth = dateRx.getMonth();
    let dayRx = day[dateRx.getDay()];
    let monthRx = month[yMonth];
    let yearRx = dateRx.getFullYear();
    let dRx = dateRx.getDate();
    let dispString = `${dayRx}, ${monthRx} ${dRx}`;

    let today = new Date();
    let tDate = today.getDate();
    let tMonth = today.getMonth();
    let tYear = today.getFullYear();
    if (tDate === dRx && tMonth === yMonth && tYear === yearRx) {
      return "Today";
    } else if (tDate - 1 === dRx && tMonth === yMonth && tYear === yearRx)
      return "Yesterday";
    if (dRx % 10 === 1) dispString += "st";
    else if (dRx % 10 === 2) dispString += "nd";
    else if (dRx % 10 === 3) dispString += "rd";
    else dispString += "th";
    return dispString;
  };

  return (
    <div className="msg-container-parent">
      {!isSameDay ? (
        <div className="date-divider-wrapper">
          <div className="date-divider">
            <div className="date-divider-text">
              {formatDay(time, day, month)}{" "}
              <p className="down-icon-divider">
                <FaAngleDown />
              </p>
            </div>
          </div>
        </div>
      ) : null}
      {!isWithin3Mins ? (
        <div className="first-container">
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
      ) : (
        <div className="second-container">
          <div className="time-div">{formatTime(time).slice(0, -3)}</div>
          <div className="body-second">{msg}</div>
        </div>
      )}
    </div>
  );
}

export default ChatMsg;
