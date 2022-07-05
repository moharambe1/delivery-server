import { Account, ErrorInCreatingAccount, ReqAccountArguments, RoleEnum } from './accounts';

export class Clients extends Account {
  static velid_create_client_argument(account: ReqAccountArguments): boolean {
    this.velid_create_account_argument(account);

    if (account.accountRole !== RoleEnum.CLIENT)
      throw new ErrorInCreatingAccount('accountRole must equel ' + RoleEnum.CLIENT);

    return true;
  }

  static velid_login_client_argument(account: ReqAccountArguments) {
    this.velid_login_account_argument(account);

    if (account.accountRole !== RoleEnum.CLIENT)
      throw new ErrorInCreatingAccount('accountRole must equel ' + RoleEnum.CLIENT);

    return true;
  }
}
