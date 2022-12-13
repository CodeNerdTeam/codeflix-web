import { AddFundEntity } from "./AddFundEntity";
import { TransactionEntity } from "./TransactionEntity";
import { UserEntity } from "./UserEntity";

export interface WalletEntity {
  id: string;
  userId: string;
  user: UserEntity;
  money: number;
  addFunds: AddFundEntity[];
  status: boolean;
  transactions: TransactionEntity[];
  create: Date;
}
