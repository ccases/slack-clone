import React from "react";
import "./ChatMsg.css";
import { FaAngleDown } from "react-icons/fa";
import Avatar from "../Avatar/Avatar";
import { formatDay, formatTime } from "../../Helpers/TimeDayFormatter";
function ChatMsg(props) {
  const { sender, time, msg, isSameDay, isWithin3Mins } = props;

  return (
    <div className="msg-container-parent">
      {!isSameDay ? (
        <div className="date-divider-wrapper">
          <div className="date-divider">
            <div className="date-divider-text">
              {formatDay(time)}{" "}
              <p className="down-icon-divider">
                <FaAngleDown />
              </p>
            </div>
          </div>
        </div>
      ) : null}
      {!isWithin3Mins ? (
        <div className="first-container">
          <div className="avatarContainer">
            <Avatar user={sender} size={40} />
          </div>
          <div className="msgWrapper">
            <div className="titleWrapper">
              <p className="sender">
                <strong>{sender.uid}</strong>
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
