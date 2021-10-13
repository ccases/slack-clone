import React, { useState, useEffect, useCallback, useRef } from "react";
import * as UserAPI from "../../UserAPI";
import Headers from "../../Helpers/Headers";
import { useSpring, animated } from "react-spring";
import { MdClose } from "react-icons/md";
import "./AddChannel.css";
import SearchBar from "../SearchBar/SearchBar";

function AddMembers(props) {
  const { ID, chat, userDb } = props;
  const [userArray, setUserArray] = useState([]);
  const [header, setHeader] = useState(Headers);
  const [allUsers, setAllUsers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [channelId, setChannelId] = useState("");

  // used in Add members onclick
  const getAllUsers = () => {
    UserAPI.listOfUsers(header)
      .then((res) => {
        console.log("success");
        setAllUsers(res.data.data);
      })
      .catch((e) => {
        console.log("failed to get users");
      });
  };

  const onAddMember = (e) => {
    e.preventDefault();
    // console.log(chat.id)
    setChannelId(chat.id);
    // console.log(channelId)
    console.log(newMember);
    let found = userDb.find((user) => user.uid === newMember);
    if (!found) {
      alert("user not found");
    } else {
      setUserArray(userArray.concat(found.id));
      console.log(found.id);

      UserAPI.addChannelMember(header, channelId, found.id)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          // console.log(e)
        });
      alert(`${found.id} is successfully added to the channel `);
    }
  };

  const getChannelDetails = () => {
    UserAPI.getChannelDetails(header, ID)
      .then((res) => {
        console.log(res.data.data.channel_members);
      })
      .catch((e) => {
        console.log("no channel details");
      });
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

  return (
    <>
      {showAddMembers ? (
        <div className="background" onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <div className="modal-wrapper">
              <div className="modal-content">
                <h2 className="name-label">Add People</h2>

                <div className="addch-form-container">
                  {/* <form onSubmit={onAddMember}>
                    <input
                      className="add-channel-input"
                      type="text"
                      onChange={(e) => {
                        setNewMember(e.target.value);
                      }}
                     
                      value={newMember}
                    />
                    <input
                      type="submit"
                      className="sidebar-button"
                      value="Add Members"                      
                    />
                     
                  </form> */}
                  <SearchBar
                    placeholder="Search for members..."
                    userDb={userDb}
                    searchBarFor="AddMembers"
                    onAddMember={onAddMember}
                    setNewMember={setNewMember}
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
    </>
  );
}

export default AddMembers;
