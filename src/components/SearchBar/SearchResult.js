import React from "react";
import Avatar from "../Avatar/Avatar";
import "./SearchResult.css";

function SearchResult({ user, setSearchEntry, submitHandler, setNewMember }) {
  const isAvailable = user !== undefined ? true : false;
  return (
    <div
      className="result"
      onClick={(e) => {
        setSearchEntry(e.target.textContent);
        if (setNewMember) setNewMember(e.target.textContent);
      }}
    >
      {isAvailable && <Avatar user={user} size={30} />}
      {isAvailable && user.uid}
    </div>
  );
}

export default SearchResult;
