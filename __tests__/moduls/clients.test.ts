import { Account, ReqAccountArguments, RoleEnum } from '../../src/moduls/accounts';
import { Clients } from '../../src/moduls/clients';

const mockAccount = jest.fn();

let accountArg: ReqAccountArguments;

describe('validation function', () => {
  mockAccount.mockClear();
  mockAccount.mockReturnValue(true);
  Account.velid_create_account_argument = mockAccount;
  beforeEach(() => {
    accountArg = {
      email: 'abc@gmail.com',
      pwd: '123456',
      phoneNumber: '0555577580',
      accountRole: RoleEnum.CLIENT
    };
  });
  it('should call validation create_account_argument', async () => {
    Clients.velid_create_client_argument(accountArg);
    expect(mockAccount).toBeCalledTimes(1);
  });

  it('should return true if giving valid client argument', async () => {
    mockAccount.mockReturnValue(true);
    expect(Clients.velid_create_client_argument(accountArg)).toEqual(true);
  });

  it('should throw error if accountRole Not equel Deliver', () => {
    accountArg.accountRole = RoleEnum.DELIVER;
    const call = () => Clients.velid_create_client_argument(accountArg);
    expect(call).toThrowError('accountRole must equel ' + RoleEnum.CLIENT);
  });
});
