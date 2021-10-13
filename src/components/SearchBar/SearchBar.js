import React, { useState } from "react";
import SearchResult from "./SearchResult";
import Headers from "../../Helpers/Headers";
import { useEffect } from "react/cjs/react.development";
import * as UserAPI from "../../UserAPI";
import { BiSearch } from "react-icons/bi";
import "./SearchBar.css";

function SearchBar(props) {
  const { placeholder, setChatWith, userDb, setUserDb } = props;
  const [searchEntry, setSearchEntry] = useState("");
  // const [userDb, setUserDb] = useState([]);
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
    if (e.target.textContent == null) return;
    let found = userDb.find((user) => user.uid === searchEntry);
    if (found === undefined) {
      alert("No users with that id!");
    } else {
      setChatWith(found);
      setIsActive(false);
    }
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
            user={user}
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
            }}
            onFocus={() => {
              getAllUsers();
              setIsActive(true);
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
        {isActive ? (
          <div
            onClick={(e) => {
              setIsActive(false);
            }}
            className="Suggestions"
          >
            {suggestions}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SearchBar;
