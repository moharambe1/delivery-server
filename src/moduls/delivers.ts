import { Account, ErrorInCreatingAccount, ReqAccountArguments, RoleEnum } from './accounts';

export class Delivers extends Account {
  static velid_create_deliver_argument(account: ReqAccountArguments): boolean {
    this.velid_create_account_argument(account);

    if (account.accountRole !== RoleEnum.DELIVER)
      throw new ErrorInCreatingAccount('accountRole must equel ' + RoleEnum.DELIVER);

    return true;
  }

  static velid_login_deliver_argument(account: ReqAccountArguments): boolean {
    this.velid_login_account_argument(account);

    if (account.accountRole !== RoleEnum.DELIVER)
      throw new ErrorInCreatingAccount('accountRole must equel ' + RoleEnum.DELIVER);

    return true;
  }
}
