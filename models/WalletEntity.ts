import { TransactionEntity } from "./TransactionEntity";
import { UserEntity } from "./UserEntity";

export interface WalletEntity {
  id: string;
  userId: string;
  user: UserEntity;
  money: number;
  transactions: TransactionEntity[];
  create: Date;
}
