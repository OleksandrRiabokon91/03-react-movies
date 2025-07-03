import css from "./App.module.css";
import "modern-normalize";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import type { MovieWithImagesFull_URL } from "../../services/movieService";
import fetchMovies from "../../services/movieService";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [arrMovie, setArrMovie] = useState<MovieWithImagesFull_URL[]>([]);
  const [, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [selectedMovie, setSelectedMovie] =
    useState<MovieWithImagesFull_URL | null>(null);

  const handleQuerySubmit = async (searchQuery: string) => {
    setHasError(false);
    setIsLoading(true);

    setQuery(searchQuery);

    setArrMovie([]);
    try {
      const results = await fetchMovies(searchQuery);
      if (results.length === 0) {
        toast.error("No movies found for your request.");
      } else {
        setArrMovie(results);
      }
    } catch {
      setHasError(true);
      toast.error("Something went wrong - try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.app}>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleQuerySubmit} />
      {isLoading ? (
        <Loader />
      ) : hasError ? (
        <ErrorMessage />
      ) : arrMovie.length > 0 ? (
        <MovieGrid
          movies={arrMovie}
          onSelect={(movie) => setSelectedMovie(movie)}
        />
      ) : null}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
