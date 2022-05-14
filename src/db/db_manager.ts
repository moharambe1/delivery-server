import { Account } from '../moduls/accounts';
import { DB_Postgres } from './db_postgres';

class DB_Manager {
  db_pg: DB_Postgres;

  constructor() {
    this.db_pg = new DB_Postgres(process.env.POSTGRES_STRING);
  }

  createAccount(account: Account) {
    return this.db_pg.createAccount(account);
  }
}

export const db_Manager = new DB_Manager();
