import React from "react";
import "./MsgPrompt.css";
function MsgPrompt(props) {
  const { error, message } = props;

  return (
    <div className="MsgPrompt">
      <div
        className={
          error
            ? "notification-txt error-class"
            : "notification-txt success-class"
        }
      >
        {message}
      </div>
    </div>
  );
}

export default MsgPrompt;
