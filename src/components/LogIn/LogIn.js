import React, { useState, useEffect } from "react";
import axios from "axios";
import SignUp from "../../components/SignUp/SignUp";
import "./LogIn.css";
import slackLogo from "../../assets/slack-logo.png";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";

function LogIn() {
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPw(e.target.value);
  };

  const handleHeader = (res) => {
    if (res.data) {
      localStorage.setItem("access-token", res.headers["access-token"]);
      localStorage.setItem("client", res.headers["client"]);
      localStorage.setItem("uid", res.headers["uid"]);
      localStorage.setItem("expiry", res.headers["expiry"]);

      window.location = "/Dashboard";
    }
  };

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
        // console.log(e.response.data.errors[0]);
        setError(e.response.data.errors[0]);
        console.log(e);
      });
  };

  return (
    <div className="container">
      <div className="login-header">
        <SignUp
          onclick={openModal}
          showModal={showModal}
          setShowModal={setShowModal}
        />

        <header className="header-container">
          <img src={slackLogo} alt="Slack Logo" />
          <h1>Sign in to Slack</h1>
          <p>
            We suggest using the <strong>email address you use at work.</strong>
          </p>
        </header>
        <div className="dummy-btn-container">
          <button className="google-btn">
            <FcGoogle /> Sign in with Google{" "}
          </button>
          <button className="apple-btn">
            <FaApple /> Sign in with Apple{" "}
          </button>
        </div>

        <h4>
          <span>OR</span>
        </h4>
        <div className="login-container">
          <form onSubmit={submitHandler}>
            <input
              type="email"
              className="email-input"
              placeholder="name@work-email.com"
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
            <div className="login-error">{error}</div>

            <input
              type="submit"
              className="submit-btn"
              value="Sign in with Email"
            />
          </form>
          <button className="signup-btn" onClick={openModal}>
            Create an account
          </button>
        </div>
      </div>
      <div className="footer-container">
        <footer>
          <span>Privacy & Terms </span>
          <span> Contact Us </span>

          <span>
            {" "}
            <FiGlobe /> Change region{" "}
          </span>
        </footer>
        <div className="copyright">
          Disclaimer: This app is created for educational purposes only.
          <br />
          Cases | Cacas | Almeda &#169; 2021
        </div>
      </div>
    </div>
  );
}

export default LogIn;
