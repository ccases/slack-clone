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
import { useEffect } from "react/cjs/react.development";
import { IoFastFood } from "react-icons/io5";

function Sidebar(props) {
  const { userDb, recentDms, channelDb, setChat, chat } = props;
  const [userChannels, setUserChannels] = useState([]);
  const [userName, setUserName] = useState([]);
  const [dmsExpanded, setDmsExpanded] = useState(true);
  const [channelsExpanded, setChannelsExpanded] = useState(true);

  const [isInRecents, setIsInRecents] = useState(false);
  useEffect(() => {
    if (chat.name) {
      setIsInRecents(true);
      return;
    }
    // if channel do nothing
    else if (chat.uid) {
      let found = recentDms.find((recents) => recents.uid === chat.uid);
      if (found) {
        setIsInRecents(true);
      } else setIsInRecents(false);
    }
  }, [chat, recentDms]);
  //modal add channel
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const notAvailable = () => {
    alert("Feature is not yet available");
  };

  const displayChannels = channelDb
    ? channelDb.map((channel) => {
        let isActive = false;
        if (chat.name === channel.name) isActive = true;
        return (
          <div
            onClick={(e) => {
              let channelName = e.target.textContent.trim();
              let selectedChannel = channelDb.find(
                (ch) => ch.name === channelName
              );
              setChat(selectedChannel);
            }}
            className={"channel-name " + (isActive ? "isActiveChat" : "")}
            key={channel.id}
          >
            <RiLockLine /> &nbsp; {channel.name}
          </div>
        );
      })
    : null;

  return (
    <div className="modal-container">
      <AddChannel
        setUserChannels={setUserChannels}
        setUserName={setUserName}
        onclick={openModal}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div className="sidebar-scrollhider">
        <div className="sidebar-container">
          <div className="sidebar-header">
            <div className="sidebar-info">
              <div className="sidebar-h2">
                Slack Clone{" "}
                <RiPencilFill
                  style={{
                    padding: "3px",
                    backgroundColor: "white",
                    fontSize: "1.5rem",
                    color: "#49274b",
                    borderRadius: "999px",
                  }}
                />
              </div>
              <div className="user-name">
                <h3 className="sidebar-h3">
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
              <div className="not-available" onClick={notAvailable}>
                <SidebarOptions Icon={RiMenu2Line} title="All unreads" />
                <SidebarOptions Icon={RiChat1Line} title="Threads" />
                <SidebarOptions Icon={RiQuestionAnswerLine} title="All DMs" />
                <SidebarOptions Icon={RiAtLine} title="Mentions & reactions" />
                <SidebarOptions Icon={RiBookmarkLine} title="Saved Items" />
                <SidebarOptions Icon={RiMore2Fill} title="More" />
              </div>

              <div onClick={openModal}>
                <SidebarOptions
                  onClick={openModal}
                  Icon={RiAddFill}
                  title="Add Channel"
                />
              </div>
            </div>
          </div>
          <div
            className="expander-div sidebar-option-container"
            onClick={() => setChannelsExpanded(!channelsExpanded)}
          >
            {channelsExpanded ? <RiArrowDownSFill /> : <RiArrowRightSFill />}{" "}
            &nbsp;Channels
          </div>
          <div
            className={
              channelsExpanded ? "direct-messages expanded" : "direct-messages"
            }
          >
            {displayChannels}
          </div>

          <div
            className="expander-div sidebar-option-container"
            onClick={() => setDmsExpanded(!dmsExpanded)}
          >
            {dmsExpanded ? <RiArrowDownSFill /> : <RiArrowRightSFill />}{" "}
            &nbsp;Direct Messages
          </div>
          <div
            className={
              dmsExpanded ? "direct-messages expanded" : "direct-messages"
            }
          >
            {recentDms.map((user) => {
              return (
                <div className="direct-message-user">
                  <DirectMessages
                    key={user.id}
                    user={user}
                    setChat={setChat}
                    chat={chat}
                  />
                </div>
              );
            })}
            {!isInRecents && (
              <DirectMessages user={chat} setChat={setChat} chat={chat} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
