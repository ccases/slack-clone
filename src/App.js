import "./App.css";
import LogIn from "./components/LogIn/LogIn";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";

import APIHeaders from "./APIContext";
import AllUsers from "./AllUsersContext";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../src/components/Dashboard/Dashboard";
import { AuthContext } from "./Auth";

function App() {
  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem("tokens") || ""
  );
  const [appAPIHeaders, setAppAPIHeaders] = useState(APIHeaders);
  const [allUsers, setAllUsers] = useState(AllUsers);

  useEffect(() => {
    console.log(appAPIHeaders["access-token"]);
  }, [appAPIHeaders]);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <div className="App">
      <ProtectedRoute path="/Dashboard" component={Dashboard} />
      {/* <AuthContext.Provider
        value={{
          authTokens,
          setAuthTokens: setTokens,
        }}
      >
        <Router>
          {!localStorage.getItem("token") ? <Redirect from="/" to="/" /> : ""}
          <Route path="/" exact>
            <APIHeaders.Provider value={[appAPIHeaders, setAppAPIHeaders]}>
              <AllUsers.Provider value={[allUsers, setAllUsers]}>
                <LogIn />
              </AllUsers.Provider>
            </APIHeaders.Provider>
          </Route>

          <ProtectedRoute exact path="/Dashboard" component={Dashboard} />
        </Router>
      </AuthContext.Provider> */}
    </div>
  );
}

export default App;
