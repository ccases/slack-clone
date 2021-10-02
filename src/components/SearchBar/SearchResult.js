import React from "react";
import "./SearchResult.css";

function SearchResult({ userEmail, setSearchEntry }) {
  return (
    <div
      className="result"
      onClick={(e) => {
        console.log(e.target.textContent);
        setSearchEntry(e.target.textContent);
      }}
    >
      {userEmail}
    </div>
  );
}

export default SearchResult;
