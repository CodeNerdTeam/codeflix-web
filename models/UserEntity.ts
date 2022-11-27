import { HistoryEntity } from "./HistoryEntity";
import { OrderEntity } from "./OrderEntity";
import { PlayListEntity } from "./PlayListEntity";

export interface UserEntity {
  id: string;
  created: Date;
  playlists: PlayListEntity[];
  orders: OrderEntity[];
  histories: HistoryEntity[];
  name: string;
  phone: string;
  email: string;
  avatar: string;
  role: string;
}
