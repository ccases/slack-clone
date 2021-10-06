import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import APIHeaders from "../../APIContext";
import SignUp from "../../components/SignUp/SignUp";
import "./LogIn.css";
import slackLogo from "../../assets/slack-logo.png";

function LogIn() {
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };


  const getAllUsers = (header) => {
    axios({
      method: "get",
      url: "http://206.189.91.54//api/v1/users",
      headers: header,
      redirect: "follow",
    })
      .then((res) => {
        console.log(`Success: ${res}`);
      })
      .catch((e) => console.log(`Error: ${e}`));
  };

  const handleEmailChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPw(e.target.value)
  }

  const handleHeader = (res) => {

    if (res.data) {
      localStorage.setItem("access-token", JSON.stringify(res.headers["access-token"]));
      localStorage.setItem("client",JSON.stringify(res.headers ["client"]));
      localStorage.setItem("uid", JSON.stringify(res.headers["uid"]));
      localStorage.setItem("expiry", JSON.stringify(res.headers["expiry"]));

      window.location = '/Dashboard'
    }

  }

  const submitHandler = (e) => {
    const url = "http://206.189.91.54//api/v1/auth/sign_in";
    e.preventDefault();

    axios
      .post(url, {
        email: username,
        password: pw,
      })
      .then((res) => handleHeader(res))
      .catch((e) => {
        console.log("error: " + e);
      });
  };

  return (
    <div className="container">
      <SignUp
        onclick={openModal}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <img src={slackLogo} alt="Slack Logo" />
      <div className="login-container">
        <strong>Login</strong>

        <form onSubmit={submitHandler}>
          <input
            type="email"
            className="email-input"
            placeholder="Email"
            onChange={handleEmailChange}
            required
          />
          <input
            type="password"
            className="password-input"
            placeholder="Password"
            onChange={handlePasswordChange}
            required
          />
          <input type="submit" value="Log In" />

          <button onClick={openModal}>Create an account</button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
