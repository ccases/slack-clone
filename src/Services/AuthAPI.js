import React from "react";

const AuthAPI = () => {
  const isAuthenticated = () => {
    return localStorage.getItem("access-token") ? true : false;
  };

  const logout = () => {
    localStorage.remove("access-token");
    localStorage.remove("client");
    localStorage.remove("uid");
    localStorage.remove("expiry");
  };

  return {
    isAuthenticated,
    logout,
  };
};

export default AuthAPI();
