import { Account, ReqAccountArguments, RoleEnum } from '../../src/moduls/accounts';

let accountArg: ReqAccountArguments;
describe('validation function', () => {
  beforeEach(() => {
    accountArg = {
      email: 'abc@gmail.com',
      pwd: '123456',
      phoneNumber: '0555577580',
      accountRole: RoleEnum.CLIENT
    };
  });
  it('should return vtrue whene given valid account arragment', async () => {
    expect(Account.velid_create_account_argument(accountArg)).toBeTruthy();
  });
  it('should throw error with {massage : accountRole argument is missing}  whene given invalid account argument', async () => {
    accountArg.accountRole = undefined;
    const call = () => Account.velid_create_account_argument(accountArg);
    expect(call).toThrowError('accountRole argument is missing');
  });
  it('should throw error with {massage : email argument is missing}  whene given invalid account argument', () => {
    accountArg.email = undefined;
    const call = () => Account.velid_create_account_argument(accountArg);
    expect(call).toThrowError('email argument is missing');
  });
  it('should throw error with {massage : pwd argument is missing}  whene given invalid account argument', () => {
    accountArg.pwd = undefined;
    const call = () => Account.velid_create_account_argument(accountArg);
    expect(call).toThrowError('pwd argument is missing');
  });
  it('should throw error with {massage : phoneNumber argument is missing}  whene given invalid account argument', () => {
    accountArg.phoneNumber = undefined;
    const call = () => Account.velid_create_account_argument(accountArg);
    expect(call).toThrowError('phoneNumber argument is missing');
  });
});
