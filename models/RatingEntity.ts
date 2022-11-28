import { FilmEntity } from "./FilmEntity";
import { UserEntity } from "./UserEntity";

export interface RatingEntity {
  userId: string;
  user: UserEntity;
  filmId: string;
  film: FilmEntity;
  point: number;
  comment: string;
}
