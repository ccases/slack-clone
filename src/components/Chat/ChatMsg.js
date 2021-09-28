import React from "react";

function ChatMsg(props) {
  const { sender, time, msg } = props;
  return (
    <div>
      {sender} at {time} : {msg}
    </div>
  );
}

export default ChatMsg;
