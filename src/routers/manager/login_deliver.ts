import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { Account, ErrorInCreatingAccount } from '../../moduls/accounts';

import { db_Manager } from '../../db/db_manager';
import { Managers } from '../../moduls/manager';

export const preHandleLoginManager = {
  preHandler: [
    (req: FastifyRequest<{ Body: { account: Account } }>, res: FastifyReply, done: HookHandlerDoneFunction): void => {
      try {
        if (Managers.velid_login_manager_argument(req.body.account)) done();
        else res.status(500).send();
      } catch (err) {
        if (err instanceof ErrorInCreatingAccount) res.status(400).send({ message: err.message });
        res.status(400).send({ message: 'error has happened' });
      }
    }
  ]
};

export const handleLoginManager = async (req: FastifyRequest<{ Body: { account: Managers } }>, res: FastifyReply) => {
  try {
    const result = await db_Manager.loginAccount(req.body.account);
    if (!result.state) {
      res.status(400).send({ message: 'account is not fand' });
      return;
    }
    req.session.id = result.id;
    req.session.accountRole = req.body.account.accountRole;
  } catch (err) {
    if (err instanceof ErrorInCreatingAccount) res.status(400).send(err.message);

    res.status(400).send({ message: 'error has happened' });
    return;
  }
  res.send({ message: 'account login successfully' });
};
