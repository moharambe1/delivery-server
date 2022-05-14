import { Account, ReqAccountArguments, RoleEnum } from '../../src/moduls/accounts';
import { Delivers } from '../../src/moduls/delivers';

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
      accountRole: RoleEnum.DELIVER
    };
  });
  it('should call validation create_account_argument', async () => {
    Delivers.velid_create_deliver_argument(accountArg);
    expect(mockAccount).toBeCalledTimes(1);
  });

  it('should return true if giving valid deliver argument', async () => {
    mockAccount.mockReturnValue(true);
    expect(Delivers.velid_create_deliver_argument(accountArg)).toEqual(true);
  });

  it('should throw error if accountRole Not equel Deliver', () => {
    accountArg.accountRole = RoleEnum.CLIENT;
    const call = () => Delivers.velid_create_deliver_argument(accountArg);
    expect(call).toThrowError('accountRole must equel ' + RoleEnum.DELIVER);
  });
});
