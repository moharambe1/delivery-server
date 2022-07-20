import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

import { db_Manager } from '../../db/db_manager';
import { ErrorPackage, StatePackageEnum } from '../../moduls/packages';

export const preHandleGetUserPackagesWithStateManager = {
  schema: {
    body: {
      phone: {
        type: 'string'
      },
      state: {
        type: 'string'
      }
    }
  },
  preHandler: [
    (
      req: FastifyRequest<{ Body: { phone: string; state: string } }>,
      res: FastifyReply,
      done: HookHandlerDoneFunction
    ): void => {
      try {
        if (req.body.state in StatePackageEnum) done();
        else res.status(500).send('StatePackageEnum value is not valid ');
      } catch (err) {
        if (err instanceof ErrorPackage) res.status(400).send({ massage: err.message });
        else res.status(400).send({ message: 'error has happened' });
      }
    }
  ]
};

export const handleGetUserPackagesWithStateManager = async (
  req: FastifyRequest<{ Body: { phone: string; state: StatePackageEnum } }>,
  res: FastifyReply
) => {
  try {
    const acnt = await db_Manager.GetAnounClinetIdName(req.body.phone);

    if (acnt.state == true) {
      const result = await db_Manager.GetAllPackagesUserWithState(acnt.id, req.body.state);
      res.status(200).send({ name: acnt.name, packages: result });
    } else res.status(400).send('لا يـوجـد عميـل بـهذا الرقـم');
  } catch (err) {
    if (err instanceof ErrorPackage) res.status(400).send(err.message);
    else res.status(400).send({ message: 'error has happened' });
  }
};
