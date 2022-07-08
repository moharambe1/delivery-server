import { ErrorInCreatingAccount } from './accounts';

export interface ReqAnounClients {
  phone: string;
  name: string;
}

export class AnounClients {
  static valid_create_anounClient_argument(account: ReqAnounClients): boolean {
    if (!account.name) throw new ErrorInCreatingAccount('sender name argument is missing');
    if (!account.phone) throw new ErrorInCreatingAccount('sender phone argument is missing');

    return true;
  }
}
