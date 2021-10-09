import React, { useState } from "react";
import AddChannel from "../Channel/AddChannel";
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
} from "react-icons/ri";
import SidebarOptions from "./SidebarOptions";

function Sidebar() {
  const [userChannels, setUserChannels] = useState([]);
  const displayChannels = userChannels
    ? userChannels.map((channel) => {
        return (
          <div className="channel-name" key={channel.id}>
            {channel.name}
          </div>
        );
      })
    : null;

  const [userName, setUserName] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
    console.log("modal popup test");
  };

  return (
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
              testhello@test.com
              {/* {displayName} */}
            </h3>
          </div>
        </div>

        <div className="sidebar-options">
          <SidebarOptions Icon={RiMenu2Line} title="All unreads" />
          <SidebarOptions Icon={RiChat1Line} title="Threads" />
          <SidebarOptions Icon={RiQuestionAnswerLine} title="All DMs" />
          <SidebarOptions Icon={RiAtLine} title="Mentions & reactions" />
          <SidebarOptions Icon={RiBookmarkLine} title="Saved Items" />
          <SidebarOptions Icon={RiMore2Fill} title="More" />

          <hr />
          <SidebarOptions
            title="Channels"
            Icon={RiMore2Fill}
            addChannelOption
            onclick={openModal}
          />
          <hr />
        </div>
      </div>

      {displayChannels}

      <AddChannel setUserChannels={setUserChannels} setUserName={setUserName} />

      <button
        onclick={openModal}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        test
      </button>
    </div>
  );
}

export default Sidebar;
