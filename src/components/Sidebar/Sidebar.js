import React, { useState } from "react";
import AddChannel from "../Channel/AddChannel";

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
  return (
    <div>
      <AddChannel setUserChannels={setUserChannels} />
      {displayChannels}
    </div>
  );
}

export default Sidebar;
