import "./App.css";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import { useEffect, useState } from "react";
import APIHeaders from "./APIContext";
import AllUsers from "./AllUsersContext";

function App() {
  const [appAPIHeaders, setAppAPIHeaders] = useState(APIHeaders);
  const [allUsers, setAllUsers] = useState(AllUsers);

  useEffect(() => {
    console.log(appAPIHeaders["access-token"]);
  }, [appAPIHeaders]);

  return (
    <div className="App">
      <SignUp />
      <APIHeaders.Provider value={[appAPIHeaders, setAppAPIHeaders]}>
        <AllUsers.Provider value={[allUsers, setAllUsers]}>
          <LogIn />
        </AllUsers.Provider>
      </APIHeaders.Provider>
    </div>
  );
}

export default App;
