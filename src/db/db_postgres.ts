import { Account, ErrorInCreatingAccount, RoleEnum } from '../moduls/accounts';
import { Pool, QueryResult } from 'pg';
import { ErrorPackage, Packages, StatePackageEnum } from '../moduls/packages';
import { AnounClients } from '../moduls/anounClients';
import { MassageError } from '../routers/utls/error';

/* idCreater ,idClient , idDelivery , PackageMoney, 
          delivringMoney, statePackage, stateMoney, StateMoneyDelivering, 
          phoneNumber, fullName, wilaya, city, addrass*/

export enum TAB_PACKAGES_CLUMNS {
  STATE_PACKAGE = 'statePackage',
  STATE_DELIVERING_MONEY = 'StateMoneyDelivering',
  STATE_PACKAGE_MONEY = 'stateMoney'
}
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
         (email,pwd,phoneNumber,accountRole) 
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
          phoneNumber, fullName, wilaya, city, addrass
          ) 
         VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
        pack.toArray()
      );
    } catch (err) {
      console.log(err);
      throw new ErrorPackage('errer in adding package');
    }
  }
  async createPackageAnoun(pack: Packages) {
    try {
      await this._m_pg.query(
        `INSERT INTO PACKAGES
         (
          idCreater ,idAnoun , idDelivery , PackageMoney, 
          delivringMoney, statePackage, stateMoney, StateMoneyDelivering, 
          phoneNumber, fullName, wilaya, city, addrass
          ) 
         VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
        pack.toArray()
      );
    } catch (err) {
      console.log(err);
      throw new ErrorPackage('errer in adding package');
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

  async CreatAnounClient(client: AnounClients) {
    try {
      await this._m_pg.query(
        `INSERT INTO ANOUNCLIENTS(
        name_,phone) VALUES($1,$2)`,
        [client.name, client.phone]
      );
    } catch (err) {
      if (err.code == 23505) throw new ErrorInCreatingAccount('phone is already exists.');
      throw new ErrorInCreatingAccount('errer in creating anoun client');
    }
  }
  async GetAnounClient(client: AnounClients): Promise<{ state: boolean; id?: number }> {
    try {
      const result = await this._m_pg.query(
        `
        SELECT id FROM ANOUNCLIENTS WHERE
        name_=$1 AND phone=$2 `,
        [client.name, client.phone]
      );
      if (result.rowCount !== 1) return { state: false };

      return { state: true, id: result.rows[0].id };
    } catch (err) {
      console.log(err);
      return { state: false };
    }
  }

  async GetAllPackagesWithState(state: StatePackageEnum) {
    try {
      let result: QueryResult<unknown>;
      if (state === StatePackageEnum.ALL) result = await this._m_pg.query(`SELECT * FROM PACKAGES `);
      else result = await this._m_pg.query(`SELECT * FROM PACKAGES WHERE statepackage=$1`, [state]);

      return result.rows;
    } catch (err) {
      console.log(err);
      throw new ErrorPackage('error has happen');
    }
  }

  async ChangeStatePackage(id: number, state: StatePackageEnum, role: RoleEnum) {
    try {
      const res = await this._m_pg.query('SELECT update_state_package($1,$2,$3);', [id, state, role]);
      return res.rows;
    } catch (e) {
      throw new MassageError('error has happen');
    }
  }
}
