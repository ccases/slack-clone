import React from "react";

const Dashboard = () => {

  const uid = localStorage.getItem('uid')
  return (
    <div>
      <h1>DASHBOARD HERE</h1>
      {uid}
    </div>
  )
}

export default Dashboard;
