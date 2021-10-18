import React, { useState, useEffect, useCallback, useRef } from "react";
// import slack-logo from "../../assets/slack-logo.png"
import { useSpring, animated } from "react-spring";
import axios from "axios";
import "./SignUp.css";
import { MdClose } from "react-icons/md";

function SignUp(props) {
  const { showModal, setShowModal } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = (e) => {
    // put fetch here
    const url = "http://206.189.91.54//api/v1/auth/";
    e.preventDefault();
    axios
      .post(url, {
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      })
      .then((res) => {
        localStorage.setItem("access-token", res.headers["access-token"]);
        localStorage.setItem("client", res.headers["client"]);
        localStorage.setItem("uid", res.headers["uid"]);
        localStorage.setItem("expiry", res.headers["expiry"]);
        window.location = "/Dashboard";
      })
      .catch((e) => {
        console.log(e.response.data.errors.full_messages[0]);
        setError(e.response.data.errors.full_messages[0]);
      });
  };

  const setBorder = (pw, confirmPw) => {
    if (pw === confirmPw) {
      return {
        border: "1.5px solid green",
      };
    } else {
      return {
        border: "1.5px solid red",
      };
    }
  };

  //modal

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        console.log("I pressed");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <div className="su-background" onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <div className="su-modal-wrapper">
              <div className="su-modal-content">
                <div className="su-title">First, enter your email</div>
                <p className="sign-up-p">
                  We suggest using the{" "}
                  <strong>email address you use at work.</strong>
                </p>
                <div className="su-form-container">
                  <form
                    onSubmit={submitHandler}
                    autoComplete="off"
                    className="signup-form"
                  >
                    <label className="sign-up-label">
                      Email
                      <input
                        className="sign-up-input"
                        type="email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        required
                      />
                    </label>
                    <label className="sign-up-label">
                      Password
                      <input
                        className="sign-up-pw"
                        style={
                          password && confirmPassword !== ""
                            ? setBorder(password, confirmPassword)
                            : null
                        }
                        type="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        required
                      />
                    </label>
                    <label className="sign-up-label">
                      Confirm Password
                      <input
                        className="sign-up-pw"
                        style={
                          password && confirmPassword !== ""
                            ? setBorder(password, confirmPassword)
                            : null
                        }
                        type="password"
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                        required
                      />
                    </label>
                    <div className="error-container">{error}</div>
                    <input
                      className="sign-up-button"
                      type="submit"
                      value="Sign up"
                      placeholder="name@work-email.com"
                    />
                  </form>
                </div>
                <MdClose
                  className="close-modal-button"
                  aria-label="Close modal"
                  onClick={() => setShowModal((prev) => !prev)}
                />
              </div>
            </div>
          </animated.div>
        </div>
      ) : null}
    </>
  );
}

export default SignUp;
