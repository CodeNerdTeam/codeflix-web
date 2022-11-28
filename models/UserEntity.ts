import { HistoryEntity } from "./HistoryEntity";
import { PlayListEntity } from "./PlayListEntity";

export interface UserEntity {
  id: string;
  created: Date;
  playlists: PlayListEntity[];
  histories: HistoryEntity[];
  name: string;
  phone: string;
  email: string;
  avatar: string;
  sex: boolean;
  role: string;
  premium: boolean;
}
