import React, { useContext, useState } from "react";
import axios from "axios";
import APIHeaders from "../APIContext";

function LoginMock() {
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");
  const [header, setHeader] = useContext(APIHeaders);

  const submitHandler = (e) => {
    const url = "http://206.189.91.54//api/v1/auth/sign_in";
    e.preventDefault();
    axios
      .post(url, {
        email: username,
        password: pw,
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
        console.log("res.headers: " + res.headers);
      })
      .catch((e) => {
        console.log("error: " + e);
      });
    console.log(username);
  };

  return (
    <div>
      <strong>Login</strong>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPw(e.target.value);
          }}
          required
        />
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
}

export default LoginMock;
