import React from "react";
import WatchedMovie from "./WatchedMovie";

const WatchedList = ({watched,handleDelete}) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} handleDelete={handleDelete} />
      ))}
    </ul>
  );
};

export default WatchedList;
