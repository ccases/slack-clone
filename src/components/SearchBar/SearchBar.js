import React, { useState, useContext } from "react";
import SearchResult from "./SearchResult";
import APIHeaders from "../../APIContext";
import AllUsers from "../../AllUsersContext";
import { useEffect } from "react/cjs/react.development";
import * as UserAPI from "../../UserAPI";

function SearchBar(props) {
  const { placeholder, setChatWith } = props;
  const [searchEntry, setSearchEntry] = useState("");
  const [userDb, setUserDb] = useContext(AllUsers);
  const [header] = useContext(APIHeaders);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (header["access-token"] === undefined) return;
    if (userDb[0] === undefined) {
      alert("still loading db");
      return;
    }
    setSearchSuggestions(
      userDb.filter((user) => user.uid.includes(searchEntry))
    );
  }, [searchEntry, userDb, header]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (userDb[0] === undefined) return;
    let found = userDb.find((user) => user.uid === searchEntry);
    console.log("FOUND " + found.uid);
    if (found) {
      setChatWith(found);
      setIsActive(false);
    } else alert("no users with that id!");
  };

  const getAllUsers = () => {
    UserAPI.listOfUsers(header)
      .then((res) => {
        setUserDb(res.data.data);
      })
      .catch((e) => {
        console.log("[SearchBar.js: getAllUsers] failed to get all users");
      });
  };
  let suggestions = searchSuggestions
    ? searchSuggestions.map((user) => {
        return (
          <SearchResult
            key={user.id}
            userEmail={user.uid}
            setSearchEntry={setSearchEntry}
            submitHandler={submitHandler}
          />
        );
      })
    : null;
  return (
    <div className="searchBar">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => {
            setSearchEntry(e.target.value);
          }}
          onFocus={() => {
            getAllUsers();
            setIsActive(true);
          }}
          value={searchEntry}
        />
        <input type="submit" value="Search" />
      </form>
      {isActive ? <div className="Suggestions">{suggestions}</div> : null}
    </div>
  );
}

export default SearchBar;
