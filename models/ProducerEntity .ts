import { FilmEntity } from "./FilmEntity";

export interface ProducerEntity {
  id: string;
  name: string;
  films: FilmEntity[];
}
