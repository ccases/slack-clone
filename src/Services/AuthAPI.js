const AuthAPI = () => {
  const isAuthenticated = () => {
    return localStorage.getItem("access-token") ? true : false;
  };

  const logout = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("client");
    localStorage.removeItem("uid");
    localStorage.removeItem("expiry");
  };

  return {
    isAuthenticated,
    logout,
  };
};

export default AuthAPI();
