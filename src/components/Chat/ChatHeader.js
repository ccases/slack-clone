import React, { useState } from "react";
import AddMembers from "../Channel/AddMembers";
import ShowChannelMembers from "../Channel/ShowChannelMembers";
import * as UserAPI from "../../UserAPI";
import Headers from "../../Helpers/Headers";
import "./ChatHeader.css";
import { MdLock } from "react-icons/md";

function ChatHeader({ chat, chatType, userDb }) {
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

  const [channelMembers, setChannelMembers] = useState([]);
  const [channelDetails, setChannelDetails] = useState("");

  const getChannelDetails = () => {
    UserAPI.getChannelDetails(Headers, chat.id)

      .then((res) => {
        setChannelMembers(res.data.data.channel_members);
        console.log(res.data.data.channel_members);
        setChannelDetails(res.data.data);

        console.log(res.data);
      })
      .catch((e) => {
        console.log("no channel details");
      });
  };

  return (
    <div>
      <div className="modals">
        <div className="add-members">
          <AddMembers
            onclick={openMemberModal}
            showAddMembers={showAddMembers}
            setShowAddMembers={setShowAddMembers}
            chat={chat}
            channelMembers={channelMembers}
            userDb={userDb}
          />
        </div>

        <div className="chat-headers" onClick={getChannelDetails}>
          <ShowChannelMembers
            onclick={openAllMemberModal}
            showMembers={showMembers}
            setShowMembers={setShowMembers}
            chat={chat}
            userDb={userDb}
            channelMembers={channelMembers}
            channelDetails={channelDetails}
          />
        </div>

        {chatType === "User" ? (
          <div className="chat-title">
            <h1> {chat.uid}</h1>
          </div>
        ) : (
          <div className="channel-header-title">
            <div className="header-child">
              <h1 onClick={openAllMemberModal}>
                {" "}
                <MdLock />
                {chat.name}
              </h1>
            </div>
            <div className="header-child">
              <button onClick={openMemberModal} className="sidebar-button">
                Add Members
              </button>
            </div>
          </div>
        )}
      </div>{" "}
    </div>
  );
}

export default ChatHeader;
