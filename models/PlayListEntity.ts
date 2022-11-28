import { FilmEntity } from "./FilmEntity";
import { UserEntity } from "./UserEntity";
export interface PlayListEntity {
  id: string;
  film: FilmEntity;
  user: UserEntity;
}
