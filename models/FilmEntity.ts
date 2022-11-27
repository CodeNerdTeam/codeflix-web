import { GenreFilmEntity } from "./GenreFilmEntity ";
import { PersonFilmEntity } from "./PersonFilmEntity ";
import { ProducerEntity } from "./ProducerEntity ";

export interface FilmEntity {
  id: string;
  name: string;
  describe: string;
  length: number;
  premium: boolean;
  producerId: string;
  producer: ProducerEntity;
  mobileUrl: string;
  views: number;
  age: string;
  webUrl: string;
  videoUrl: string;
  created: Date;
  genres: GenreFilmEntity[];
  persons: PersonFilmEntity[];
}
