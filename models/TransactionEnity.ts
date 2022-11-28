import { PackageEntity } from "./PackageEntity";
import { UserEntity } from "./UserEntity";

export interface TransactionEntity {
  id: string;
  packageId: string;
  package: PackageEntity;
  userId: string;
  user: UserEntity;
  created: Date;
}
