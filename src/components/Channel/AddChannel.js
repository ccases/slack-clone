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
      
      if (res.data.errors !== undefined) {
        console.log(res.data.errors)
        alert(res.data.errors)
      } else {
        alert(`new channel ${res.data.data.name} has been created`)
      }
        // alert(res.data.data.name);
        // console.log(res.data);
      })
      .catch((e) => {
         
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
    <div className = "main-modal">
      {showModal ? (
        <div className="add-ch-background" onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <div className="add-ch-modal-wrapper">
              <div className="add-ch-modal-content">
                <h1 className="add-channel-header">Create a private channel</h1>
                <span className="add-channel-content">
                  Channels are where your team communicates. They’re best when
                  organized around a topic — #marketing, for example.
                </span>

                <span className="name-label">Name</span>

                <div className="addch-form-container">
                  <form onSubmit={onSubmit}>
                    <input
                      className="add-channel-input"
                      type="text"
                      onChange={(e) => {
                        setChannelName(e.target.value);
                      }}
                      value={channelName}
                      onClick={updateChannels}
                    />
                    <input
                      className="sidebar-button"
                      type="submit"
                      value="Add New Channel"
                    />
                  </form>

                  <button className="sidebar-button" onClick={updateChannels}>
                    UpdateChannels
                  </button>
                
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
    </div>
  );
};

export default AddChannel;
