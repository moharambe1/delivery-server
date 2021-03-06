import { Account, RoleEnum } from '../moduls/accounts';
import { AnounClients } from '../moduls/anounClients';
import { Packages, StatePackageEnum } from '../moduls/packages';
import { DB_Postgres } from './db_postgres';

class DB_Manager {
  db_pg: DB_Postgres;

  constructor() {
    this.db_pg = new DB_Postgres(process.env.POSTGRES_STRING);
  }

  createAccount(account: Account) {
    return this.db_pg.createAccount(account);
  }

  loginAccount(account: Account) {
    return this.db_pg.loginAccount(account);
  }

  createPackage(pack: Packages) {
    return this.db_pg.createPackage(pack);
  }
  createPackageAnoun(pack: Packages) {
    return this.db_pg.createPackageAnoun(pack);
  }
  getClientPackages(accountId: number) {
    return this.db_pg.getClientPackages(accountId);
  }

  GetAllPackagesWithState(state: StatePackageEnum) {
    return this.db_pg.GetAllPackagesWithState(state);
  }
  GetAllPackagesUserWithState(id: number, state: StatePackageEnum) {
    return this.db_pg.GetAllPackagesUserWithState(id, state);
  }
  GetAnounClinet(anounClinet: AnounClients) {
    return this.db_pg.GetAnounClient(anounClinet);
  }
  GetAnounClinetIdName(phone: string) {
    return this.db_pg.GetAnounClientIdName(phone);
  }
  GetAnounClinetPhoneName(id: number) {
    return this.db_pg.GetAnounClientPhoneName(id);
  }
  createAnounClient(anounClinet: AnounClients) {
    return this.db_pg.CreatAnounClient(anounClinet);
  }

  ChangeStatePackage(id: number, state: StatePackageEnum, role: RoleEnum) {
    return this.db_pg.ChangeStatePackage(id, state, role);
  }
  SetPackagesStateByIds(ids: number[], newState: StatePackageEnum) {
    return this.db_pg.SetPackagesStateWithId(ids, newState);
  }
  GetPackageWithId(id: number) {
    return this.db_pg.GetPackageWithId(id);
  }
}

export const db_Manager = new DB_Manager();
