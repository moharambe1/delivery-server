import { Account, ErrorInCreatingAccount, ReqAccountArguments, RoleEnum } from './accounts';

export class Managers extends Account {
  static velid_create_manager_argument(account: ReqAccountArguments): boolean {
    this.velid_create_account_argument(account);

    if (account.accountRole !== RoleEnum.MANAGER)
      throw new ErrorInCreatingAccount('accountRole must equel ' + RoleEnum.MANAGER);

    return true;
  }

  static velid_login_manager_argument(account: ReqAccountArguments): boolean {
    this.velid_login_account_argument(account);

    if (account.accountRole !== RoleEnum.MANAGER)
      throw new ErrorInCreatingAccount('accountRole must equel ' + RoleEnum.MANAGER);

    return true;
  }
}
