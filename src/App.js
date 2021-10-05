import "./App.css";
import Chat from "./components/Chat/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import { useEffect, useState } from "react";
import APIHeaders from "./APIContext";
import AllUsers from "./AllUsersContext";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [appAPIHeaders, setAppAPIHeaders] = useState(APIHeaders);
  const [allUsers, setAllUsers] = useState(AllUsers);

  useEffect(() => {
    console.log(appAPIHeaders["access-token"]);
  }, [appAPIHeaders]);

  return (
    <div className="App">
      <APIHeaders.Provider value={[appAPIHeaders, setAppAPIHeaders]}>
        <AllUsers.Provider value={[allUsers, setAllUsers]}>
          <Sidebar />
          <LogIn />
        </AllUsers.Provider>
      </APIHeaders.Provider>
      {/* </Router> */}
    </div>
  );
}

export default App;
