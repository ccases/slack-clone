import React, { useState } from "react";
import * as UserAPI from "../../UserAPI";
import Headers from "../../Helpers/Headers";
import "./ChatForm.css";
import {
  IoAtOutline,
  IoSend,
  IoAttach,
  IoVideocamOutline,
  IoMicOutline,
} from "react-icons/io5";
import {
  BsEmojiSmile,
  BsFillLightningFill,
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsCodeSlash,
  BsLink45Deg,
  BsListOl,
  BsListUl,
  BsBlockquoteLeft,
  BsCodeSquare,
} from "react-icons/bs";

function ChatForm(props) {
  const { userId, setConvo, chatType } = props;
  const [header] = useState(Headers);
  const [chatInput, setChatInput] = useState("");

  var raw = {
    receiver_id: userId,
    receiver_class: chatType,
    body: `${chatInput}`,
  };

  const handleKeyUp = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      //submit
      handleSubmit(e);
      return false;
    }
    if (
      (e.code === "Enter" || (e.location === 3 && e.key === "Enter")) &&
      e.shiftKey
    ) {
      setChatInput(chatInput + "\n");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let input = chatInput;
    if (chatInput == null || input.trim().length === 0) return;
    if (header["access-token"] === undefined) return;
    UserAPI.sendMsg(header, raw)
      .then((res) => {
        UserAPI.getMsgs(header, userId, chatType)
          .then((res) => {
            setConvo(res.data.data);
          })
          .catch(() => console.log("Failed to get messages"));
      })
      .catch((e) => console.log(e));
    setChatInput("");
  };
  return (
    <div className="ChatForm">
      <div className="chat-form-container">
        {/* <form onSubmit={handleSubmit}> */}
        <input
          className="chat-input"
          type="text"
          onChange={(e) => {
            setChatInput(e.target.value);
          }}
          value={chatInput}
          onKeyUp={(e) => handleKeyUp(e)}
        />

        <div className="chat-form-icons-container">
          <div className="icons-container">
            <div className="chat-form-icons disabled-icons">
              <BsFillLightningFill />
            </div>
            <div className="chat-form-icons disabled-icons">
              <BsTypeBold />
            </div>
            <div className="chat-form-icons disabled-icons">
              <BsTypeItalic />
            </div>
            <div className="chat-form-icons disabled-icons">
              <BsTypeStrikethrough />
            </div>
            <div className="chat-form-icons disabled-icons">
              <BsCodeSlash />
            </div>
            <div className="chat-form-icons disabled-icons">
              <BsLink45Deg />
            </div>
            <div className="chat-form-icons disabled-icons">
              <BsListOl />
            </div>
            <div className="chat-form-icons disabled-icons">
              <BsListUl />
            </div>
            <div className="chat-form-icons disabled-icons">
              <BsBlockquoteLeft />
            </div>
            <div className="chat-form-icons disabled-icons">
              <BsCodeSquare />
            </div>
          </div>
          <div className="icons-container">
            <div className="chat-form-icons disabled-icons">
              <IoAtOutline />
            </div>
            <div className="chat-form-icons">
              <BsEmojiSmile />
            </div>
            <div className="chat-form-icons">
              <IoAttach />
            </div>
            <div className="chat-form-icons">
              <IoVideocamOutline />
            </div>
            <div className="chat-form-icons">
              <IoMicOutline />
            </div>
            <div
              className="chat-form-icons send-icon"
              onClick={(e) => handleSubmit(e)}
            >
              <IoSend />
            </div>
          </div>
          <input type="submit" value="send" className="send"></input>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}

export default ChatForm;
