import React, { useState } from "react";
import { tempMovieData } from "../../../data";
import MovieList from "./MovieList";

const Box = ({children}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen &&  children }
    </div>
  );
};

export default Box;
