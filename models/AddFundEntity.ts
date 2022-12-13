import { WalletEntity } from "./WalletEntity";
export interface AddFundEntity {
  walletId: string;
  wallet: WalletEntity;
  money: number;
  status: boolean;
  created: Date;
}
