import "./App.css";
import Chat from "./components/Chat/Chat";
import { useEffect, useState } from "react";
import APIHeaders from "./APIContext";
import AllUsers from "./AllUsersContext";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  const [appAPIHeaders, setAppAPIHeaders] = useState(APIHeaders);
  const [allUsers, setAllUsers] = useState(AllUsers);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log(appAPIHeaders["access-token"]);
  }, [appAPIHeaders]);

  return (
    
    <div className="App">
      <Router>
        <Login {/* if logged in or no errors, redirect else stay dito */}/>
        <APIHeaders.Provider value={[appAPIHeaders, setAppAPIHeaders]}>
          <AllUsers.Provider value={[allUsers, setAllUsers]}>
            {/* <LoginMock /> */}
            <Chat />
          </AllUsers.Provider>
        </APIHeaders.Provider>
      </Router>
    </div>
  );
}

export default App;
