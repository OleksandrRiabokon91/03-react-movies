export interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

export const IMAGE_POSTER_BASE: string = "https://image.tmdb.org/t/p/w500";
export const IMAGE_BACKDROP_BASE: string =
  "https://image.tmdb.org/t/p/original";
