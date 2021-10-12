import React, { useState } from "react";
import SearchResult from "./SearchResult";
import Headers from "../../Helpers/Headers";
import { useEffect } from "react/cjs/react.development";
import * as UserAPI from "../../UserAPI";
import { BiSearch } from "react-icons/bi";
import "./SearchBar.css";

function SearchBar(props) {
  const { placeholder, setChatWith } = props;
  const [searchEntry, setSearchEntry] = useState("");
  const [userDb, setUserDb] = useState([]);
  const [header] = useState(Headers);
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
    <div className="container-search">
      <div className="searchBar">
        <form onSubmit={submitHandler} className="form-searchbar">
          <input
            type="text"
            placeholder={placeholder}
            onChange={(e) => {
              setSearchEntry(e.target.value);
              setIsActive(true);
            }}
            onFocus={() => {
              getAllUsers();
            }}
            className="input-search"
            value={searchEntry}
          />
          <button type="submit" className="header-btn">
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {isActive ? <div className="Suggestions">{suggestions}</div> : null}
      </div>
    </div>
  );
}

export default SearchBar;
