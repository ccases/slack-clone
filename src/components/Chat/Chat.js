import React, { useState, useEffect, useContext } from "react";
import ChatArea from "./ChatArea";
import ChatForm from "./ChatForm";
import SearchBar from "../SearchBar/SearchBar";
import "./Chat.css";
import * as UserAPI from "../../UserAPI";
import APIHeaders from "../../APIContext";
import axios from "axios";
import AllUsers from "../../AllUsersContext";

function Chat() {
  const [header, setHeader] = useContext(APIHeaders);
  const [allUsers, setAllUsers] = useContext(AllUsers);
  const [chatWith, setChatWith] = useState("");
  const [userSearch, setUserSearch] = useState("");

  useEffect(() => {
    console.log(chatWith);
  }, [chatWith]);
  // LOG IN BUTTON LANG DITO FOR TESTING AND GET USERS - START
  const logIn = () => {
    const url = "http://206.189.91.54//api/v1/auth/";

    axios
      .post(url + "sign_in", {
        email: "testhello@test.com",
        password: "Hello12345",
      })
      .then((res) => {
        console.log("success: " + res);
        setHeader({
          "access-token": res.headers["access-token"],
          client: res.headers["client"],
          expiry: res.headers["expiry"],
          uid: res.headers["uid"],
        });

        console.log("headers: " + header);
        console.log("res.headers: " + res.headers["access-token"]);
      })
      .catch((e) => {
        console.log("error: " + e);
      });
  };

  const recentlyDms = () => {
    UserAPI.getRecent(header)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log("What is recently DMS");
      });
  };
  // LOG IN BUTTON LANG DITO FOR TESTING AND GET USERS - END
  const submitHandler = (e) => {
    // get ID ng sesendan pati username
    e.preventDefault();
    const foundUser = allUsers.find((user) => user.uid === userSearch);
    if (foundUser) {
      setChatWith(foundUser);
    } else {
      alert("No users with the given email!");
    }
  };

  // logIn();

  return (
    <div>
      {/* TANGGALIN LAHAT NG NASA GITNA NETO PATI NUNG ISA */}
      <button onClick={logIn}> Login </button>
      <button onClick={recentlyDms}> RecentlyDms </button>
      {/* ^ PAKITANGGAL TO MAMAYA TY */}
      {/* <button onClick={clickHandler}>Get Chat</button> */}
      {/* <SearchBar type="user" placeholder="Type an email..." /> */}
      {/* <form onSubmit={submitHandler}>
        <input
          type="text"
          value={userSearch}
          onChange={(e) => {
            setUserSearch(e.target.value);
          }}
          placeholder="Search Avion School"
        />
        <input type="submit" value="Search" />
      </form> */}
      <SearchBar placeholder="Search Avion School" setChatWith={setChatWith} />
      <ChatArea userId={chatWith.id} userEmail={chatWith.uid} />
      <ChatForm userId={chatWith.id} />
    </div>
  );
}

export default Chat;
