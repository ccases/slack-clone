import React, { useState, useContext } from "react";
import * as UserAPI from "../../UserAPI";
import APIHeaders from "../../APIContext";

function ChatForm(props) {
  const { userId } = props;
  const [header, setHeader] = useContext(APIHeaders);
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
