import { HistoryEntity } from "./HistoryEntity";
import { PlayListEntity } from "./PlayListEntity";
import { WalletEntity } from "./WalletEntity";

export interface UserEntity {
  id: string;
  created: Date;
  playLists: PlayListEntity[];
  histories: HistoryEntity[];
  name: string;
  phone: string;
  email: string;
  avatar: string;
  sex: boolean;
  role: string;
  premium: boolean;
  wallet: WalletEntity;
}
