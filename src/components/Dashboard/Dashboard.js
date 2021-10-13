import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Chat from "../Chat/Chat";
import Headers from "../../Helpers/Headers";
import AuthAPI from "../../Services/AuthAPI";
import Header from "../Header/Header";
import * as UserAPI from "../../UserAPI";
import "./Dashboard.css";

function Dashboard() {
  const [headers] = useState(Headers);
  const [userDb, setUserDb] = useState([]);
  const [recentDms, setRecentDms] = useState([]);
  const [filteredRecents, setFilteredRecents] = useState([]);
  const [channelDb, setChannelDb] = useState([]);

  const [chat, setChat] = useState("");

  const [usersAreLoaded, setUsersAreLoaded] = useState(false);
  const [recentsAreLoaded, setRecentsAreLoaded] = useState(false);
  const [channelsAreLoaded, setChannelsAreLoaded] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const [isErrorLoading, setIsErrorLoading] = useState(false);
  useEffect(() => {
    // get all users

    UserAPI.listOfUsers(headers)
      .then((res) => {
        setUserDb(res.data.data);
        setUsersAreLoaded(true);
      })
      .catch((e) => {
        console.log("[SearchBar.js: getAllUsers] failed to get all users");
        setIsErrorLoading(true);
      });

    // get all users with chat history with this guy
    UserAPI.getRecent(headers)
      .then((res) => {
        setRecentDms(res.data.data);
        setRecentsAreLoaded(true);
      })
      .catch((e) => {
        console.log(e);

        setIsErrorLoading(true);
      });

    // get everyone signed up para lumabas sa searchbar
    UserAPI.getAllUsersChannels(headers)
      .then((res) => {
        setChannelDb(res.data.data);
        setChannelsAreLoaded(true);
      })
      .catch((e) => {
        console.log("error: " + e);
        setIsErrorLoading(true);
      });
  }, [headers]);

  useEffect(() => {
    // get rid of duplicates
    let filteredUids = new Set();
    recentDms.forEach((dm) => {
      filteredUids.add(dm.uid);
    });

    let tempRecents = [];
    filteredUids.forEach((email) => {
      let found = recentDms.find((user) => user.uid === email);
      tempRecents.push(found);
    });

    setFilteredRecents(tempRecents);
  }, [recentDms]);

  useEffect(() => {
    //initialize
    let dependencies = 3;
    let n = 0;
    if (usersAreLoaded) {
      n++;
    }
    if (recentsAreLoaded) n++;
    if (channelsAreLoaded) n++;

    if (n === dependencies) setLoadingComplete(true);

    let found = userDb.find((user) => user.uid === headers.uid);
    setChat(found);
  }, [usersAreLoaded, recentsAreLoaded, channelsAreLoaded]);

  const displayErrorMsg = () => {
    return <div>Please log in again to continue</div>;
  };
  return (
    <div className="dashboard">
      {isErrorLoading ? displayErrorMsg() : null}
      {loadingComplete && <Header userDb={userDb} channelDb={channelDb} />}
      <div className="main-container">
        <div className="sidebar-dashboard">
          {loadingComplete && (
            <Sidebar
              userDb={userDb}
              recentDms={filteredRecents}
              channelDb={channelDb}
              setChat={setChat}
              setChannelDb={setChannelDb}
            />
          )}
        </div>
        <div className="chat-dashboard">
          {loadingComplete && <Chat 
          userDb = {userDb}
          chat={chat} recentDms={recentDms} />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
