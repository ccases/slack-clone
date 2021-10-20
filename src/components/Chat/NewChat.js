import React, { useState, useContext, useEffect, useCallback } from "react";
import { ChannelDbContext, UserDbContext } from "../../Services/UserContexts";
import SearchResult from "../SearchBar/SearchResult";
import "./NewChat.css";

function NewChat(props) {
  const { setNewChat } = props;
  const [searchEntry, setSearchEntry] = useState("");
  const [userDb, setUserDb] = useContext(UserDbContext);
  const [channelDb, channelDbContext] = useContext(ChannelDbContext);
  const [isActive, setIsActive] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  useEffect(() => {
    setSearchSuggestions(
      userDb.filter((user) => user.uid.includes(searchEntry))
    );
  }, [userDb, searchEntry]);
  useEffect(() => {
    if (searchSuggestions.length === 1) {
      setNewChat(searchSuggestions[0]);
    }
  }, [searchSuggestions]);

  const handleClick = useCallback(
    (e) => {
      let cl = e.target.classList;
      if (cl.contains("result")) {
        setIsActive(false);
      } else if (!cl.contains("input-search")) {
        setIsActive(false);
      }
    },
    [setIsActive]
  );
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [handleClick]);
  const Suggestions = searchSuggestions
    ? searchSuggestions.map((user) => {
        return (
          <SearchResult
            key={user.id}
            user={user}
            setSearchEntry={setSearchEntry}
          />
        );
      })
    : null;
  return (
    <div className="NewChat" style={{ height: "100%" }}>
      <div className="newchat-input-container">
        To:{" "}
        <input
          className="input-search newchat-input-search"
          value={searchEntry}
          onChange={(e) => {
            setSearchEntry(e.target.value);
          }}
          placeholder="somebody@example.com"
          onFocus={() => setIsActive(true)}
        />
        <div className="newchat-suggestions-wrapper">
          {isActive && Suggestions}
        </div>
      </div>
    </div>
  );
}

export default NewChat;
