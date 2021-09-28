import React from "react";

function SearchResult(props) {
  const { result } = props;
  return <div className="result">{result}</div>;
}

export default SearchResult;
