import { Account } from '../moduls/accounts';
import { Packages } from '../moduls/packages';
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

  getClientPackages(accountId: number) {
    return this.db_pg.getClientPackages(accountId);
  }
}

export const db_Manager = new DB_Manager();
