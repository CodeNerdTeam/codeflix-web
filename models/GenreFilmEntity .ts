import { FilmEntity } from "./FilmEntity";
import { GenreEntity } from "./GenreEntity";

export interface GenreFilmEntity {
  genreId: string;
  filmId: string;
  genre: GenreEntity;
  film: FilmEntity;
}
