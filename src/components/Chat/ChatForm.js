import React, { useState, useContext } from "react";
import * as UserAPI from "../../UserAPI";
import APIHeaders from "../../APIContext";

function ChatForm(props) {
  const { userId, setConvo } = props;
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
        UserAPI.getMsgs(header, userId)
          .then((res) => {
            setConvo(res.data.data);
          })
          .catch((e) => console.log("Failed to get messages"));
      })
      .catch((e) => console.log(e));
    setChatInput("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setChatInput(e.target.value);
          }}
          value={chatInput}
        />
        <input type="submit" value="send" />
      </form>
    </div>
  );
}

export default ChatForm;
