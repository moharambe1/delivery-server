import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

import { db_Manager } from '../../db/db_manager';
import { ErrorPackage, StatePackageEnum } from '../../moduls/packages';

export const preHandleGetPackagesWithStateManager = {
  preHandler: [
    (req: FastifyRequest<{ Body: { state: string } }>, res: FastifyReply, done: HookHandlerDoneFunction): void => {
      try {
        if (req.body.state in StatePackageEnum) done();
        else res.status(500).send();
      } catch (err) {
        if (err instanceof ErrorPackage) res.status(400).send({ massage: err.message });
        else res.status(400).send({ message: 'error has happened' });
      }
    }
  ]
};

export const handleGetPackagesWithStateManager = async (
  req: FastifyRequest<{ Body: { state: StatePackageEnum } }>,
  res: FastifyReply
) => {
  try {
    const result = await db_Manager.GetAllPackagesWithState(req.body.state);

    res.status(200).send(result);
  } catch (err) {
    if (err instanceof ErrorPackage) res.status(400).send(err.message);
    else res.status(400).send({ message: 'error has happened' });
  }
};
