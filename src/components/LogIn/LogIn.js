import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import APIHeaders from "../../APIContext";
import SignUp from "../../components/SignUp/SignUp";
import "./LogIn.css";
import slackLogo from "../../assets/slack-logo.png";
import { useAuth } from "../../Auth";
import { Redirect } from "react-router";

function LogIn(props) {
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");
  const [header, setHeader] = useContext(APIHeaders);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();

  let referer =
    props.location.state !== undefined ? props.location.state.referer : "/";

  //modal
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    if (header["access-token"] == null) return;
    setTimeout(() => {
      getAllUsers(header);
    }, 200);
  }, [header]);

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

  const submitHandler = (e) => {
    const url = "http://206.189.91.54//api/v1/auth/sign_in";
    e.preventDefault();

    axios
      .post(url, {
        email: username,
        password: pw,
      })
      .then((res) => {
        setHeader({
          "access-token": res.headers["access-token"],
          client: res.headers["client"],
          expiry: res.headers["expiry"],
          uid: res.headers["uid"],
        });
        setAuthTokens(res.data);
        setLoggedIn(true);
      })
      .catch((e) => {
        setIsError(true);
        console.log("error: " + e);
      });
  };

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

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
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
          <input
            type="password"
            className="password-input"
            placeholder="Password"
            onChange={(e) => {
              setPw(e.target.value);
            }}
            required
          />
          <input type="submit" value="Log In" />

          {isError && <div>The username or password is incorrect</div>}

          <button onClick={openModal}>Create an account</button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
