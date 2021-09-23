import "./App.css";
import SignUp from "./components/SignUp/SignUp";
import Chat from "./components/Chat/Chat";
import LoginMock from "./components/LoginMock";
import { useEffect, useState } from "react";
import APIHeaders from "./APIContext";

function App() {
  const [appAPIHeaders, setAppAPIHeaders] = useState(APIHeaders);

  useEffect(() => {
    console.log(appAPIHeaders["access-token"]);
  }, [appAPIHeaders]);

  return (
    <div className="App">
      <SignUp />
      <APIHeaders.Provider value={[appAPIHeaders, setAppAPIHeaders]}>
        <LoginMock />
        <Chat />
      </APIHeaders.Provider>
    </div>
  );
}

export default App;
