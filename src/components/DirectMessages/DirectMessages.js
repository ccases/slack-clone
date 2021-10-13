import React from "react";
import Avatar from "../Avatar/Avatar";
import "./DirectMessages.css";

function DirectMessages({ user, setChat, chat }) {
  const clickHandler = (e) => {
    setChat(user);
  };
  let isActive = chat.uid === user.uid ? true : false;
  return (
    <div
      className={"direct-messages-div " + (isActive ? "isActiveChat" : "")}
      onClick={clickHandler}
    >
      <div className="direct-messages-avatar">
        <Avatar user={user} size={20} />
      </div>
      {/* size in px */}
      <div className="direct-messages-uid">{user.uid}</div>
    </div>
  );
}

export default DirectMessages;
