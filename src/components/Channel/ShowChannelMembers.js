import React, { useState, useEffect, useCallback, useRef } from "react";
import * as UserAPI from "../../UserAPI";
import Headers from "../../Helpers/Headers";
import { useSpring, animated } from "react-spring";
import { MdClose, MdLock } from "react-icons/md";
import "./ShowChannelMembers.css";
import Avatar from '../Avatar/Avatar'

function ShowChannelMembers(props) {
  const { chat, userDb, channelMembers, channelDetails } = props;
  const [userArray, setUserArray] = useState([]);
  const [header, setHeader] = useState(Headers);
  const [allUsers, setAllUsers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [channelId, setChannelId] = useState("1224");
  


const displayChannelMembers = channelMembers.map((member)=> {
  let user = userDb.find(user => user.id === member.user_id)
  return (
    <div className = "channel-members" key={member.user_id}>
    <Avatar user={user} size={30} /> {user.uid} 
    </div>
  )
})

const getUid = (id) => {
  if (userDb[0].uid) {
  let uid = userDb.find(user => user.id === id)
  console.log(uid)

if (uid) 
    return (uid.uid)
  }

}

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


  const dateFormat = (date) => {

    const createdDate = new Date(date)
     const month = createdDate.toLocaleString('default', { month: 'long' });
     const day = createdDate.getDate();
     const year = createdDate.getFullYear();
    
    return (`${month} ${day}, ${year} `
    )
  }


  return (
    <>
      {showMembers ? (
        <div className="cd-background" onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <div className="cd-modal-wrapper">
              <div className="cd-modal-content">
                 <div className="channel-member-details" > 
                  <h2 className="channel-details">Channel Details</h2>
                 
                 <div className="channel-title"> <MdLock/> <span className="ch-name">{channelDetails.name}</span> </div>
  
    <div className ="created-by"> Created by</div>
    <div className ="channel-owner"> <span className="owner-details">{getUid(channelDetails.owner_id)}</span> on  <span className="owner-details">{dateFormat(channelDetails.created_at)}
    </span></div>
    </div>
    <h2 className="channel-details">Channel Members</h2>
                <div className="display-channel-members"> {displayChannelMembers}</div>
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
