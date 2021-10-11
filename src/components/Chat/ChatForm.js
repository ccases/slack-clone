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
  const [isActive, setIsActive] = useState(false);

  var raw = {
    receiver_id: userId,
    receiver_class: chatType,
    body: `${chatInput}`,
  };

  const handleKeyUp = (e) => {
    e.preventDefault();
    const isKeyEnter = (e) => {
      if (e.code === "Enter" || (e.location === 3 && e.key === "Enter"))
        //to also catch the numpad enter
        return true;

      return false;
    };
    if (isKeyEnter(e) && e.shiftKey) {
    } else if (isKeyEnter(e)) {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let input = chatInput;
    if (chatInput == null || input.trim().length === 0) return;
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
      <div className="chat-form-container">
        <form onSubmit={handleSubmit}>
          <textarea
            className="chat-input"
            type="text"
            onChange={(e) => {
              setChatInput(e.target.value);
            }}
            value={chatInput}
            onKeyUp={(e) => handleKeyUp(e)}
            onFocus={(e) => setIsActive(true)}
            onBlur={(e) => setIsActive(false)}
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
        </form>
      </div>
    </div>
  );
}

export default ChatForm;
