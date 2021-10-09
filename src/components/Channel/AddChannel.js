import React, { useState, useEffect, useCallback, useRef } from "react";
import * as UserAPI from "../../UserAPI";
import Headers from "../../Helpers/Headers";
import { useSpring, animated } from "react-spring";
import { MdClose } from "react-icons/md";
import "./AddChannel.css";

const AddChannel = (props) => {
  const { userId, setUserChannels, ID, channelDb } = props;
  const [channels, setChannels] = useState([]);
  const [channelName, setChannelName] = useState("");
  const { userName, setUserName } = props;
  const [userArray, setUserArray] = useState([]);
  const [header, setHeader] = useState(Headers);
  const [allUsers, setAllUsers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [channelId, setChannelId] = useState("1224");

  const onSubmit = (e) => {
    e.preventDefault();

    UserAPI.createChannel(header, {
      name: channelName,
      user_ids: userArray,
    })

      .then((res) => {
        console.log(res.data.data);
        alert("Channel Created");
      })
      .catch((e) => {
        console.log("Create Channel Error " + e);
      });
  };

  const { showModal, setShowModal } = props;
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  //not working!!!
  const updateChannels = channelDb
    ? channelDb.map((channel) => {
        console.log(channel.name);
        return (
          <div className="channel-name" key={channel.id}>
            {channel.name}
          </div>
        );
      })
    : null;

  return (
    <>
      {showModal ? (
        <div className="background" onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <div className="modal-wrapper">
              <div className="modal-content">
                <h1>Create a private channel</h1>
                <span className="add-channel-content">
                  Channels are where your team communicates. They’re best when
                  organized around a topic — #marketing, for example.
                </span>

                <span className="name-label">Name</span>

                <div className="form-container">
                  <form onSubmit={onSubmit}>
                    <input
                      type="text"
                      onChange={(e) => {
                        setChannelName(e.target.value);
                      }}
                      value={channelName}
                      onClick={updateChannels}
                    />
                    <input type="submit" value="Add New Channel" />
                  </form>

                  <button onClick={updateChannels}>UpdateChannels</button>
                  {/* <form onSubmit={onAddMember}>
                    <input
                      type="text"
                      onChange={(e) => {
                        setNewMember(e.target.value);
                      }}
                      onClick={(e) => {
                        getAllUsers();
                      }}
                      value={newMember}
                    />
                    <input type="submit" value="Add Members" />
                  </form>
                  <button onClick={getChannelDetails}>
                    View Channel Members
                  </button>{" "} */}
                </div>
                <MdClose
                  className="close-modal-button"
                  aria-label="Close modal"
                  onClick={() => setShowModal((prev) => !prev)}
                />
              </div>
            </div>
          </animated.div>{" "}
        </div>
      ) : null}
    </>
  );
};

export default AddChannel;
