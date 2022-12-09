import { PersonFilmEntity } from "./PersonFilmEntity ";
export interface PersonEntity {
  id: string;
  name: string;
  sex: boolean;
  describe: string;
  films: PersonFilmEntity[];
  avatar: string;
}
