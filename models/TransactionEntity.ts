import { PackageEntity } from "./PackageEntity";
import { WalletEntity } from "./WalletEntity";

export interface TransactionEntity {
  id: string;
  walletId: string;
  wallet: WalletEntity;
  packageName: string;
  price: number;
  time: number;
  created: Date;
}
