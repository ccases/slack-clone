import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Chat from "../Chat/Chat";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="main-container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Dashboard;
