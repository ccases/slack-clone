import React, { useState } from "react";
import AddChannel from "../Channel/AddChannel";
import Headers from "../../Helpers/Headers";
import "./Sidebar.css";
import {
  RiPencilFill,
  RiCheckboxBlankCircleFill,
  RiMenu2Line,
  RiQuestionAnswerLine,
  RiChat1Line,
  RiAtLine,
  RiBookmarkLine,
  RiMore2Fill,
  RiLockLine,
  RiArrowDownSFill,
  RiArrowRightSFill,
  RiAddFill,
} from "react-icons/ri";
import SidebarOptions from "./SidebarOptions";
import DirectMessages from "../DirectMessages/DirectMessages";
import AddMembers from "../Channel/AddMembers";
import ShowChannelMembers from "../Channel/ShowChannelMembers";

function Sidebar(props) {
  const { userDb, recentDms, channelDb, setChat } = props;
  const [userChannels, setUserChannels] = useState([]);
  const [userName, setUserName] = useState([]);
  const [dmsExpanded, setDmsExpanded] = useState(true);
  const [channelsExpanded, setChannelsExpanded] = useState(true);

  //modal add channel
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

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

  const displayChannels = channelDb
    ? channelDb.map((channel) => {
        return (
          <div className="channel-name" key={channel.id}>
            {channel.name}
          </div>
        );
      })
    : null;

  {
    /* {displayChannels.map((channels) => {
          return <div className="direct-message-user">{displayChannels}</div>;
        })} */
  }

  return (
    <div className="modal-container">
      <AddChannel
        setUserChannels={setUserChannels}
        setUserName={setUserName}
        onclick={openModal}
        showModal={showModal}
        setShowModal={setShowModal}
      />
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
      <div className="sidebar-container">
        <div className="sidebar-header">
          <div className="sidebar-info">
            <h2>
              Slack Clone{" "}
              <RiPencilFill
                style={{
                  padding: "3px",
                  backgroundColor: "white",
                  fontSize: "1.5rem",
                  color: "#49274b",
                  borderRadius: "999px",
                  marginLeft: "100px",
                }}
              />
            </h2>
            <div className="user-name">
              <h3>
                <RiCheckboxBlankCircleFill
                  style={{
                    marginTop: "1px",
                    marginRight: "9px",
                    fontSize: "12px",
                    color: "green",
                  }}
                />{" "}
                {Headers.uid}
                {/* {displayName} */}
              </h3>
            </div>
          </div>

          <div className="sidebar-options">
            <button onClick={openModal}>Add Channel</button>
            <button onClick={openMemberModal}>Add Members</button>
            <button onClick={openAllMemberModal}>View Channel Members</button>
            <SidebarOptions Icon={RiMenu2Line} title="All unreads" />
            <SidebarOptions Icon={RiChat1Line} title="Threads" />
            <SidebarOptions Icon={RiQuestionAnswerLine} title="All DMs" />
            <SidebarOptions Icon={RiAtLine} title="Mentions & reactions" />
            <SidebarOptions Icon={RiBookmarkLine} title="Saved Items" />
            <SidebarOptions Icon={RiMore2Fill} title="More" />
            <SidebarOptions
              onClick={openModal}
              Icon={RiAddFill}
              title="Add Channel"
            />
          </div>
        </div>
        <div
          className="dms-expander-div"
          onClick={() => setChannelsExpanded(!channelsExpanded)}
        >
          {channelsExpanded ? <RiArrowDownSFill /> : <RiArrowRightSFill />}{" "}
          Channels
        </div>
        <div
          className={
            channelsExpanded ? "direct-messages expanded" : "direct-messages"
          }
        >
          {displayChannels}
        </div>

        <div
          className="dms-expander-div"
          onClick={() => setDmsExpanded(!dmsExpanded)}
        >
          {dmsExpanded ? <RiArrowDownSFill /> : <RiArrowRightSFill />} Direct
          Messages
        </div>
        <div
          className={
            dmsExpanded ? "direct-messages expanded" : "direct-messages"
          }
        >
          {recentDms.map((user) => {
            return (
              <div className="direct-message-user">
                <DirectMessages key={user.id} user={user} setChat={setChat} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;