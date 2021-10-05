import React, { useState, useContext } from "react";
import * as UserAPI from "../../UserAPI";
import APIHeaders from "../../APIContext";
import "./ChatForm.css";
function ChatForm(props) {
  const { userId, setConvo, chatType } = props;
  const [header] = useContext(APIHeaders);
  const [chatInput, setChatInput] = useState("");

  var raw = {
    receiver_id: userId,
    receiver_class: "User",
    body: `${chatInput}`,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (chatInput == null) return;
    if (header["access-token"] === undefined) return;
    UserAPI.sendMsg(header, raw)
      .then((res) => {
        console.log("Message sent!");
        UserAPI.getMsgs(header, userId, chatType)
          .then((res) => {
            setConvo(res.data.data);
          })
          .catch((e) => console.log("Failed to get messages"));
      })
      .catch((e) => console.log(e));
    setChatInput("");
  };
  return (
    <div className="ChatForm">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <textarea
            type="text"
            onChange={(e) => {
              setChatInput(e.target.value);
            }}
            value={chatInput}
          />
          <input type="submit" value="send" className="send" />
        </form>
      </div>
    </div>
  );
}

export default ChatForm;
