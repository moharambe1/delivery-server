import { Account, ErrorInCreatingAccount } from '../moduls/accounts';
import { Pool } from 'pg';
import { ErrorPackage, Packages } from '../moduls/packages';

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

  async loginAccount(account: Account): Promise<{ state: boolean; id?: number }> {
    try {
      const result = await this._m_pg.query(
        `
        SELECT id, accountRole FROM ACCOUNTS WHERE
        email=$1 AND pwd=$2 AND accountRole=$3`,
        [account.email, account.pwd, account.accountRole]
      );

      if (result.rowCount !== 1) return { state: false };

      return { state: true, id: result.rows[0].id };
    } catch (err) {
      console.log(err);
      return { state: false };
    }
  }
  async createPackage(pack: Packages) {
    try {
      await this._m_pg.query(
        `INSERT INTO PACKAGES
         (
          idCreater ,idClient , idDelivery , PackageMoney, 
          delivringMoney, statePackage, stateMoney, StateMoneyDelivering, 
          phoneNumer, fullName, wilaya, city, addrass
          ) 
         VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
        pack.toArray()
      );
    } catch (err) {
      if (err.code == 23505) throw new ErrorInCreatingAccount('email is already exists.');
      throw new ErrorInCreatingAccount('errer in adding account');
    }
  }

  async getClientPackages(accountId: number) {
    try {
      const result = await this._m_pg.query(
        `
        SELECT * FROM PACKAGES WHERE
        idCreater=$1`,
        [accountId]
      );

      return result.rows;
    } catch (err) {
      console.log(err);
      throw new ErrorPackage('error has happen');
    }
  }
}
