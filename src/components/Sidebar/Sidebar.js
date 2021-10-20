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
import { ChannelDbContext, ChatContext } from "../../Services/UserContexts";
import SidebarOptions from "./SidebarOptions";
import DirectMessages from "../DirectMessages/DirectMessages";
import { useContext, useEffect } from "react/cjs/react.development";

function Sidebar(props) {
  const { recentDms } = props;

  const [chat, setChat] = useContext(ChatContext);
  const [channelDb, setChannelDb] = useContext(ChannelDbContext);

  const [setUserChannels] = useState([]);
  const [setUserName] = useState([]);
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
            key={channel.name}
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
                <div>
                  <RiPencilFill
                    style={{
                      padding: "3px",
                      marginRight: "20px",
                      backgroundColor: "white",
                      fontSize: "1.5rem",
                      color: "#49274b",
                      borderRadius: "999px",
                    }}
                  />
                </div>
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
            {!isInRecents && (
              <DirectMessages user={chat} setChat={setChat} chat={chat} />
            )}
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
          </div>
          <div className="disclaimer">
            Disclaimer: This app is created for educational purposes only.
            <br />
            Cases | Cacas | Almeda &#169; 2021
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
