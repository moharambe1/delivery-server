import { Account, ErrorInCreatingAccount } from '../moduls/accounts';
import { Pool } from 'pg';

export class DB_Postgres {
  _m_pg: Pool;

  constructor(connectionString: string) {
    this._m_pg = new Pool({ connectionString: connectionString, keepAlive: true });
    this._m_pg.connect();
  }

  async createAccount(account: Account) {
    try {
      await this._m_pg.query(
        `INSERT INTO ACCOUNTS
         (email,pwd,phoneNumer,accountRole) 
         VALUES($1,$2,$3,$4)`,
        [account.email, account.pwd, account.phoneNumber, account.accountRole]
      );
    } catch (err) {
      if (err.code == 23505) throw new ErrorInCreatingAccount('email is already exists.');
      throw new ErrorInCreatingAccount('errer in adding account');
    }
  }
}
