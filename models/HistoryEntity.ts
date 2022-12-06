import { FilmEntity } from "./FilmEntity";
import { UserEntity } from "./UserEntity";

export interface HistoryEntity {
  id: string;
  film: FilmEntity;
  filmId: string;
  user: UserEntity;
  userId: string;
}
