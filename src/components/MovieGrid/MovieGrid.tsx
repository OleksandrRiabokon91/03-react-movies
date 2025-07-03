import css from "./MovieGrid.module.css";
import type { MovieWithImagesFull_URL } from "../../services/movieService";

interface MovieGridProps {
  movies: MovieWithImagesFull_URL[];
  onSelect: (movie: MovieWithImagesFull_URL) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  if (movies.length === 0) return null;

  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id} onClick={() => onSelect(movie)}>
          <div className={css.card}>
            <img
              className={css.image}
              src={movie.poster_full || "/fallback.svg"}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
