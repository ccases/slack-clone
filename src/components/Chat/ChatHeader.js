import React, {useState} from 'react'
import AddMembers from "../Channel/AddMembers";
import ShowChannelMembers from "../Channel/ShowChannelMembers";



function ChatHeader({chat, chatType}) {

     //modal add members
  const [showAddMembers, setShowAddMembers] = useState(false);
  const openMemberModal = () => {
    setShowAddMembers((prev) => !prev);
  };

  //modal show channel members
  const [showMembers, setShowMembers] = useState(false);
  const openAllMemberModal = () => {
    setShowMembers((prev) => !prev);
  };
    return (
        <div>
         <AddMembers
        onclick={openMemberModal}
        showAddMembers={showAddMembers}
        setShowAddMembers={setShowAddMembers}
      />
      <ShowChannelMembers
        onclick={openAllMemberModal}
        showMembers={showMembers}
        setShowMembers={setShowMembers}
      />
            {chatType === "User" ? (
                <div className="chat-title">
               <h1> {chat.uid}</h1>
                </div>
            ): (
                <div className="chat-title">
               <h1> {chat.name}</h1>


               
               <button onClick={openMemberModal}className="sidebar-button">Add Members</button>
            <button onClick={openAllMemberModal}>View Channel Members</button>
                </div>

            )}  
        </div>
    )
}

export default ChatHeader
