import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Chat from "../Chat/Chat";
import Headers from "../../Helpers/Headers";
import AuthAPI from "../../Services/AuthAPI";
import Header from "../Header/Header";
import * as UserAPI from "../../UserAPI";

function Dashboard() {
  const [headers] = useState(Headers);
  const [userDb, setUserDb] = useState([]);
  const [recentDms, setRecentDms] = useState([]);
  const [channelDb, setChannelDb] = useState([]);
  const [chat, setChat] = useState(headers["uid"]);

  useEffect(() => {
    // get all users and set avatar for each(not implemented yet)
    console.log(headers);
    UserAPI.listOfUsers(headers)
      .then((res) => {
        setUserDb(res.data.data);
      })
      .catch((e) => {
        console.log("[SearchBar.js: getAllUsers] failed to get all users");
      });

    // get all users with chat history with this guy
    UserAPI.getRecent(headers)
      .then((res) => {
        setRecentDms(res);
      })
      .catch((e) => {
        console.log(e);
      });

    // get everyone signed up para lumabas sa searchbar
    UserAPI.getAllUsersChannels(headers)
      .then((res) => {
        setChannelDb(res.data.data);
      })
      .catch((e) => {
        console.log("error: " + e);
      });
  }, []);

  return (
    <div className="dashboard">
      <Header userDb={userDb} channelDb={channelDb} />
      <div className="main-container">
        <Sidebar
          userDb={userDb}
          recentDms={recentDms}
          channelDb={channelDb}
          setChat={setChat}
        />
        <Chat chat={chat} />
      </div>
    </div>
  );
}

export default Dashboard;
