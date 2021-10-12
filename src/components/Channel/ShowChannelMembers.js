import React, { useState, useEffect, useCallback, useRef } from "react";
import * as UserAPI from "../../UserAPI";
import Headers from "../../Helpers/Headers";
import { useSpring, animated } from "react-spring";
import { MdClose } from "react-icons/md";
import "./AddChannel.css";

function ShowChannelMembers(props) {
  const { ID } = props;
  const [userArray, setUserArray] = useState([]);
  const [header, setHeader] = useState(Headers);
  const [allUsers, setAllUsers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [channelId, setChannelId] = useState("1224");

  const getChannelDetails = () => {
    UserAPI.getChannelDetails(header, ID)
      .then((res) => {
        console.log(res);
        console.log(res.data.data.channel_members);
      })
      .catch((e) => {
        console.log("no channel details");
      });
  };

  //modal
  const { showMembers, setShowMembers } = props;
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showMembers ? 1 : 0,
    transform: showMembers ? `translateY(0%)` : `translateY(-100%)`,
  });

  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowMembers(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showMembers) {
        setShowMembers(false);
      }
    },
    [setShowMembers, showMembers]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showMembers ? (
        <div className="background" onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <div className="modal-wrapper">
              <div className="modal-content">
                <h2 className="name-label">Channel Members</h2>

                <div className="addch-form-container">
                  <button
                    className="sidebar-button"
                    onClick={getChannelDetails}
                  >
                    View Channel Members
                  </button>{" "}
                </div>
                <MdClose
                  className="close-modal-button"
                  aria-label="Close modal"
                  onClick={() => setShowMembers((prev) => !prev)}
                />
              </div>
            </div>
          </animated.div>{" "}
        </div>
      ) : null}
    </>
  );
}

export default ShowChannelMembers;
