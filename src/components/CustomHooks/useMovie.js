import { useEffect, useState } from "react";

const KEY = "d60bc73e";

export function useMovie(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const fetching = async () => {
      try {
        setIsLoading(true);
        setError(""); // Reset error state before fetching
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}
    `,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error("Network Error");
        }
        const data = await res.json();
        console.log(data);
        if (data.Response === "False") {
          throw new Error("Fetching Error with Data");
        }

        setMovies(data.Search);
        console.log(data.Search);
        setIsLoading(false);
        setError("");
      } catch (err) {
        console.error(err);
        if (err.name === "TypeError" && err.message === "Failed to fetch") {
          setError(
            "Network Error: Failed to fetch data. Please check your internet connection."
          );
        } else if (err.name !== "ERR_ABORTED") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetching();
    //backFromMovieDetail();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { isLoading, movies, error };
}
