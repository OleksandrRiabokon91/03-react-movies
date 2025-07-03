import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Movie } from "../types/movie";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const IMAGE_POSTER_BASE = "https://image.tmdb.org/t/p/w500";
const IMAGE_BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieWithImagesFull_URL extends Movie {
  poster_full: string;
  backdrop_full: string;
}

export default async function fetchMovies(
  query: string,
  page: number = 1
): Promise<MovieWithImagesFull_URL[]> {
  const baseURL: string = "https://api.themoviedb.org/3";
  const endPoint: string = "/search/movie";
  const url: string = baseURL + endPoint;

  const params = {
    query,
    page,
    include_adult: false,
    language: "en-US",
  };

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  };

  const res: AxiosResponse<MoviesResponse> = await axios.get(url, {
    headers,
    params,
  });

  const moviesWithImages: MovieWithImagesFull_URL[] = res.data.results.map(
    (movie) => ({
      ...movie,
      poster_full: movie.poster_path
        ? `${IMAGE_POSTER_BASE}${movie.poster_path}`
        : "",
      backdrop_full: movie.backdrop_path
        ? `${IMAGE_BACKDROP_BASE}${movie.backdrop_path}`
        : "",
    })
  );

  return moviesWithImages;
}
