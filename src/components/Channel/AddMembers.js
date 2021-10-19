import React, { useState, useEffect, useCallback, useRef } from "react";
import * as UserAPI from "../../UserAPI";
import Headers from "../../Helpers/Headers";
import { useSpring, animated } from "react-spring";
import { MdClose } from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";
import "./AddMembers.css";
import SearchBar from "../SearchBar/SearchBar";
import MsgPrompt from "../MsgPrompt/MsgPrompt";

function AddMembers(props) {
  const { chat, userDb } = props;
  const [userArray, setUserArray] = useState([]);
  const [header] = useState(Headers);
  const [newMember, setNewMember] = useState("");
  const [errors, setErrors] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const onAddMember = (e) => {
    e.preventDefault();
    // console.log(chat.id)
    let found = userDb.find((user) => user.uid === newMember);
    if (!found) {
      setErrors(true);
      setResponseMsg("");
      setResponseMsg("No users with that ID!");
    } else {
      setUserArray(userArray.concat(found.id));
      UserAPI.addChannelMember(header, chat.id, found.id)
        .then((res) => {
          if (res.data.errors) {
            setErrors(true);
            setResponseMsg("");
            setResponseMsg(res.data.errors);
          } else {
            setErrors(false);
            setResponseMsg("");
            setResponseMsg(`Added ${found.uid} to ${chat.name}!`);
          }
        })
        .catch((e) => {
          if (e.response) {
            alert(e.response.data.errors.full_messages[0]);
          }
        });
    }
  };

  //modal
  const { showAddMembers, setShowAddMembers } = props;
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showAddMembers ? 1 : 0,
    transform: showAddMembers ? `translateY(0%)` : `translateY(-100%)`,
  });

  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowAddMembers(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showAddMembers) {
        setShowAddMembers(false);
      }
    },
    [setShowAddMembers, showAddMembers]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  useEffect(() => {
    const showMsgTimer = setInterval(() => {
      setResponseMsg("");
    }, 5000);
    return () => {
      clearInterval(showMsgTimer);
    };
  }, [responseMsg]);

  return (
    <>
      {showAddMembers ? (
        <div className="add-mem-background" onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <div className="add-mem-modal-wrapper">
              <div className="add-mem-modal-content">
                <div className="add-mem-header">
                  <div className="add-mem-name-icon">
                    <RiUserAddLine color={"#1164a3ff"} />
                  </div>
                  <div className="add-mem-name-label">Add People</div>
                </div>
                <div className="add-mem-form-container">
                  <SearchBar
                    placeholder="Find members..."
                    userDb={userDb}
                    searchBarFor="AddMembers"
                    onAddMember={onAddMember}
                    setNewMember={setNewMember}
                    className="add-mem-input"
                  />
                </div>
                <MdClose
                  className="close-modal-button"
                  aria-label="Close modal"
                  onClick={() => setShowAddMembers((prev) => !prev)}
                />
              </div>
            </div>
          </animated.div>{" "}
        </div>
      ) : null}

      {responseMsg && <MsgPrompt error={errors} message={responseMsg} />}
    </>
  );
}

export default AddMembers;
