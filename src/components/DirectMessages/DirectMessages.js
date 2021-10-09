import React from "react";
import "./DirectMessages.css";

function DirectMessages({ user, setChat }) {
  const clickHandler = (e) => {
    setChat(user);
  };
  return (
    <div className="direct-messages-div" onClick={clickHandler}>
      {user.uid}
    </div>
  );
}

export default DirectMessages;
