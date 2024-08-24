import React, { useEffect, useRef } from "react";
import { useKey } from "../CustomHooks/useKey";

const Search = ({ query, setQuery }) => {
  const elSelected = useRef(null);

  useKey("Enter", () => {
    if (document.activeElement === elSelected.current) {
      return;
    }
    elSelected.current.focus();
    setQuery("");
  });

  

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={elSelected}
    />
  );
};

export default Search;
