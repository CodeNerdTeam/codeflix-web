import { PackageEntity } from "./PackageEntity";
import { WalletEntity } from "./WalletEntity";

export interface TransactionEntity {
  id: string;
  packageId: string;
  package: PackageEntity;
  walletId: string;
  wallet: WalletEntity;
  created: Date;
}
