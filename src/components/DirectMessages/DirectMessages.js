import React from "react";
import Avatar from "../Avatar/Avatar";
import "./DirectMessages.css";

function DirectMessages({ user, setChat }) {
  const clickHandler = (e) => {
    setChat(user);
  };
  return (
    <div className="direct-messages-div" onClick={clickHandler}>
      <div className="direct-messages-avatar">
        <Avatar user={user} size={20} />
      </div>
      {/* size in px */}
      <div className="direct-messages-uid">{user.uid}</div>
    </div>
  );
}

export default DirectMessages;
