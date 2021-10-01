import React, { useState, useEffect, useCallback, useRef } from "react";
// import slack-logo from "../../assets/slack-logo.png"
import { useSpring, animated } from "react-spring";
import axios from "axios";
import "./SignUp.css";
import signupImage from "../../assets/signup.jpg";
import { MdClose } from "react-icons/md";

function SignUp(props) {
  const { onClick, showModal, setShowModal } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const [isLoading, setLoading] = useState(false);
  // const [error, setError] = useState({ errorMsg: "", error: false });

  useEffect(() => {
    // validate here
  }, [confirmPassword, password]);

  const isMatching = (pw, confirmPw) => {
    if (pw === confirmPw) {
      return true;
    }
    return false;
  };

  const submitHandler = (e) => {
    // put fetch here
    const url = "http://206.189.91.54//api/v1/auth/";
    e.preventDefault();
    axios
      .post(url, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log("success: " + res);
      })
      .catch((e) => {
        console.log("error: " + e);
      });
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
        <div className="background" onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <div className="modal-wrapper">
              <img className="modal-img" src={signupImage} alt="Sign Up" />
              <div className="modal-content">
                <h1>First, enter your email</h1>
                <p>
                  We suggest using the{" "}
                  <strong>email address you use at work.</strong>
                </p>
                <div className="form-container">
                  <form onSubmit={submitHandler}>
                    <label>
                      Email
                      <input
                        type="email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        required
                      />
                    </label>
                    <label>
                      Password
                      <input
                        type="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        required
                      />
                    </label>
                    <label>
                      Confirm Password
                      <input
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </label>
                    <input
                      type="submit"
                      className="sign-up-button"
                      value="Sign up"
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

// postData("http://206.189.91.54//api/v1/auth/", {
//   email: { email },
//   password: { password },
//   password_confirmation: { confirmPassword },
// })
//   .then((data) => {
//     console.log("Success: " + data); // JSON data parsed by `data.json()` call
//   })
//   .catch((e) => {
//     console.log(e);
//   });

export default SignUp;
