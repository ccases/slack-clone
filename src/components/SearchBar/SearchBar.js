import React, { useState, useContext } from "react";
import SearchResult from "./SearchResult";
import APIHeaders from "../../APIContext";
import AllUsers from "../../AllUsersContext";
import { useEffect } from "react/cjs/react.development";

function SearchBar(props) {
  const { type, placeholder } = props;
  const [searchEntry, setSearchEntry] = useState("");
  const [userDb, setUserDb] = useContext(AllUsers);
  const [header, setHeader] = useContext(APIHeaders);
  const [searchArray, setSearchArray] = useState([]);

  useEffect(() => {
    const found = userDb.find((user) => user.uid === searchEntry);
    if (!found) return;
  }, [searchEntry]);

  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={(e) => {
        setSearchEntry(e.target.value);
      }}
    />
  );
}

export default SearchBar;
