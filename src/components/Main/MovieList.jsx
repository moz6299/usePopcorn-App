import React, { useState } from "react";
import { tempMovieData } from "../../../data";
import Movie from "./Movie";

const MovieList = ({movies, handleSelectedId}) => {
  
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} handleSelectedId={handleSelectedId} />
      ))}
    </ul>
  );
};

export default MovieList;
