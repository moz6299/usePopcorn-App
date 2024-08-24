import React, { useEffect, useRef, useState } from "react";
import StarRating from "./../StarRating";
import Loading from "../Loading";
import { useKey } from "../CustomHooks/useKey";

const KEY = "d60bc73e";

const MovieDetail = ({
  selectedId,
  backFromMovieDetail,
  onAdding,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const count = useRef(0);

  useEffect(() => {
    if (userRating) {
      count.current++;
    }
  }, [userRating]);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const ratedNumber = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      const res =
        await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}
  `);
      const data = await res.json();
      console.log(data);
      setMovie(data);
      setIsLoading(false);
    };
    fetchMovieDetails();
  }, [selectedId]);

  const handleAdd = () => {
    const newMovie = {
      imdbID: selectedId,
      Title: title,
      Year: year,
      Poster: poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: imdbRating,
      userRating,
      counter: count.current,
    };
    onAdding(newMovie);
    backFromMovieDetail();
  };

  useEffect(() => {
    if (!title) return;
    document.title = `Movie/${title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  useKey("Escape", backFromMovieDetail);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <header>
          <button onClick={backFromMovieDetail}>⬅️</button>
          <img src={poster} alt="Poster" />
          <div className="details-overview">
            <h2>{title}</h2>
            <p>
              {released} &bull; {runtime}
            </p>
            <p> {genre} </p>
            <p>
              <span>star</span>
              {imdbRating} IMDB Rating
            </p>
          </div>
        </header>
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <section>
          <div className="rating">
            {isWatched ? (
              <p>You rated This Movie by {ratedNumber} stars</p>
            ) : (
              <>
                <StarRating
                  maxRating={10}
                  size={24}
                  setMovieRated={setUserRating}
                />
                {userRating > 0 && (
                  <button className="btn-add" onClick={handleAdd}>Add to List</button>
                )}
              </>
            )}
          </div>
          <p>
            <em>{plot}</em>
          </p>
          <p>Starring: {actors}</p>
          <p>Directed by: {director}</p>
        </section>
      )}
    </div>
  );
};

export default MovieDetail;
