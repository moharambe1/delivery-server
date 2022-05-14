import { db_Manager } from '../../src/db/db_manager';
import { DB_Postgres } from '../../src/db/db_postgres';
import { Account, ReqAccountArguments, RoleEnum } from '../../src/moduls/accounts';

let account: Account;
jest.mock('../../src/db/db_postgres', () => {
  return {
    SoundPlayer: jest.fn().mockImplementation()
  };
});
beforeEach(() => {
  const accountArg: ReqAccountArguments = {
    email: 'abc@gmail.com',
    pwd: '123456',
    phoneNumber: '0555577580',
    accountRole: RoleEnum.CLIENT
  };
  account = new Account(accountArg);
});

describe('test for postgres logic', () => {
  const db_postgres = new DB_Postgres('');
  const mockCreateAccount = jest.fn();
  db_postgres.createAccount = mockCreateAccount;

  db_Manager.db_pg = db_postgres;
  beforeEach(() => {
    mockCreateAccount.mockClear();
  });

  it('create account should call db_postgres createAccount function', async () => {
    db_Manager.createAccount(account);
    expect(mockCreateAccount).toBeCalledTimes(1);
  });
});
