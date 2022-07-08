import { CityEnum, WilayaEnum } from './shared';

export enum RoleEnum {
  MANAGER = 'MANAGER',
  DELIVER = 'DELIVER',
  CLIENT = 'CLIENT'
}
export interface ReqAccountArguments {
  id?: number;
  email?: string;
  pwd?: string;

  fullName?: string;
  phoneNumber?: string;

  wilaya?: WilayaEnum;
  city?: CityEnum;
  addrass?: string;

  accountRole?: RoleEnum;
  accountLevel?: number;
}

export class ErrorInCreatingAccount extends Error {}

export class Account {
  id?: number;
  email: string;
  pwd: string;

  fullName?: string;
  phoneNumber?: string;

  wilaya?: WilayaEnum;
  city?: CityEnum;
  addrass?: string;

  accountRole?: RoleEnum;
  accountLevel?: number;

  constructor(account: ReqAccountArguments) {
    this.init(account);
  }

  init(account: ReqAccountArguments) {
    Object.assign(this, account);
  }

  static velid_create_account_argument(account: ReqAccountArguments): boolean {
    if (!account.email) throw new ErrorInCreatingAccount('email argument is missing');
    if (!account.pwd) throw new ErrorInCreatingAccount('pwd argument is missing');
    if (!account.phoneNumber) throw new ErrorInCreatingAccount('phoneNumber argument is missing');
    if (!account.accountRole) throw new ErrorInCreatingAccount('accountRole argumen t is missing');

    return true;
  }
  static velid_login_account_argument(account: ReqAccountArguments): boolean {
    if (!account) throw new ErrorInCreatingAccount('account argument is missing');
    if (!account.email) throw new ErrorInCreatingAccount('email argument is missing');
    if (!account.pwd) throw new ErrorInCreatingAccount('pwd argument is missing');
    if (!account.accountRole) throw new ErrorInCreatingAccount('accountRole argument is missing');

    return true;
  }
}
