import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { Account, ErrorInCreatingAccount } from '../moduls/accounts';

import { db_Manager } from '../db/db_manager';
import { Delivers } from '../moduls/delivers';

export const preHandleCreateDeliver = {
  preHandler: [
    (req: FastifyRequest<{ Body: { account: Account } }>, res: FastifyReply, done: HookHandlerDoneFunction): void => {
      try {
        if (Delivers.velid_create_deliver_argument(req.body.account)) done();
        else res.status(500).send();
      } catch (err) {
        if (err instanceof ErrorInCreatingAccount) res.status(400).send({ message: err.message });
        res.status(400).send({ message: 'error has happened' });
      }
    }
  ]
};

export const handleCreateDeliver = async (req: FastifyRequest<{ Body: { account: Delivers } }>, res: FastifyReply) => {
  try {
    if (req.body.account != undefined) await db_Manager.createAccount(req.body.account);
    else res.status(400).send({ message: 'account is missing' });
  } catch (err) {
    if (err instanceof ErrorInCreatingAccount) res.status(400).send(err.message);
  }
  res.send({ message: 'account added sucessfly' });
};
