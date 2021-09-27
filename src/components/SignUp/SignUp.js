import React, { useState, useEffect } from "react";
// import slack-logo from "../../assets/slack-logo.png"
import axios from "axios";
import "./SignUp.css";

function SignUp(props) {
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

  return (
    <>
      <h1>First, enter your email</h1>
      <p>
        We suggest using the <strong>email address you use at work.</strong>
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
          <input type="submit" className="submit-button" value="Sign up" />
        </form>
      </div>
    </>
  );
}

export default SignUp;

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
