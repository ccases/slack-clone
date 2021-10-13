import React from "react";
import Avatar from "../Avatar/Avatar";
import "./SearchResult.css";

function SearchResult({ user, setSearchEntry, submitHandler }) {
  const isAvailable = user !== undefined ? true : false;
  return (
    <div
      className="result"
      onClick={(e) => {
        console.log(e.target.textContent);
        setSearchEntry(e.target.textContent);
      }}
    >
      {isAvailable && <Avatar user={user} size={30} />}
      {isAvailable && user.uid}
    </div>
  );
}

export default SearchResult;
