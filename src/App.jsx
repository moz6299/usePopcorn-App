import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import { tempMovieData, tempWatchedData } from "../data";
import Search from "./components/Navbar/Search";
import NumResults from "./components/Navbar/NumResults";
import MovieList from "./components/Main/MovieList";
import Box from "./components/Main/Box";
import WachedSummary from "./components/Main/WachedSummary";
import WatchedList from "./components/Main/WatchedList";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetail from "./components/Main/MovieDetail";
import { useMovie } from "./components/CustomHooks/useMovie";
import { useLocalStorageState } from "./components/CustomHooks/useLocalStorageState";

const KEY = "d60bc73e";

export default function App() {
  const [query, setQuery] = useState("");

  const { isLoading, movies, error } = useMovie(query);

  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched]  = useLocalStorageState([],"watched")

  const handleSelectedId = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const backFromMovieDetail = () => {
    setSelectedId(null);
  };

  const onAdding = (newMovie) => {
    setWatched((prev) => [...prev, newMovie]);
  };

  const handleDelete = (id) => {
    setWatched((prev) => prev.filter((movie) => movie.imdbID !== id));
  };

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {/*isLoading ? <Loading /> : <MovieList movies={movies} />*/}
          {isLoading && <Loading />}
          {!isLoading && !error && (
            <MovieList movies={movies} handleSelectedId={handleSelectedId} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetail
              selectedId={selectedId}
              backFromMovieDetail={backFromMovieDetail}
              onAdding={onAdding}
              watched={watched}
            />
          ) : (
            <>
              <WachedSummary watched={watched} />
              <WatchedList watched={watched} handleDelete={handleDelete} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
