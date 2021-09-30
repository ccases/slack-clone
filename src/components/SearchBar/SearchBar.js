import React, { useState, useContext } from "react";
import SearchResult from "./SearchResult";
import APIHeaders from "../../APIContext";
import AllUsers from "../../AllUsersContext";
import { useEffect } from "react/cjs/react.development";
import * as UserAPI from "../../UserAPI";

function SearchBar(props) {
  const { type, placeholder, setChatWith } = props;
  const [searchEntry, setSearchEntry] = useState("");
  const [userDb, setUserDb] = useContext(AllUsers);
  const [header, setHeader] = useContext(APIHeaders);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // const found = userDb.find((user) => user.uid === searchEntry);
    // if (!found) return;
    if (header["access-token"] === undefined) return;
    if (userDb[0] === undefined) {
      alert("still loading db");
      return;
    }
    setSearchSuggestions(
      userDb.filter((user) => user.uid.includes(searchEntry))
    );
  }, [searchEntry, userDb]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (userDb[0] === undefined) return;
    let found = userDb.find((user) => user.uid === searchEntry);
    if (found) setChatWith(found);
    else alert("no users with that id!");
  };

  const getAllUsers = () => {
    UserAPI.listOfUsers(header)
      .then((res) => {
        setUserDb(res.data.data);
      })
      .catch((e) => {
        console.log("failed to get all users");
      });
  };
  let suggestions = searchSuggestions
    ? searchSuggestions.map((user) => {
        return (
          <SearchResult
            key={user.id}
            userEmail={user.uid}
            setChatWith={setChatWith}
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
          onBlur={(e) => setIsActive(false)}
        />
        <input type="submit" value="Search" />
      </form>
      {isActive ? <div className="Suggestions">{suggestions}</div> : null}
    </div>
  );
}

export default SearchBar;
