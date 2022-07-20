import { FastifyReply, FastifyRequest, FastifySchema, HookHandlerDoneFunction } from 'fastify';
import { db_Manager } from '../../db/db_manager';
import { ErrorPackage, Packages, StatePackageEnum } from '../../moduls/packages';
import { MassageError } from '../utls/error';

interface ReqBody {
  ids: number[];
  newState: StatePackageEnum;
}
const schemaSetPackagesStateByIds: FastifySchema = {
  body: {
    packages: {
      type: 'object',
      properties: {
        ids: { type: 'array' },
        newState: { type: 'string' }
      },
      required: ['ids', 'newState']
    }
  }
};

export const preHandleSetPackagesStateByIds = {
  schema: schemaSetPackagesStateByIds,
  preHandler: [
    (req: FastifyRequest<{ Body: { packages: ReqBody } }>, res: FastifyReply, done: HookHandlerDoneFunction): void => {
      try {
        if (Packages.valid_Change_Package_State(req.body.packages)) done();
        else res.status(500).send();
      } catch (err) {
        if (err instanceof ErrorPackage) res.status(400).send({ message: err.message });
        else res.status(400).send({ message: 'error has happened' });
      }
    }
  ]
};

export const handleSetPackagesStateByIds = async (
  req: FastifyRequest<{ Body: { packages: ReqBody } }>,
  res: FastifyReply
) => {
  let result: boolean;
  try {
    const tpackage = req.body.packages;
    result = await db_Manager.SetPackagesStateByIds(tpackage.ids, tpackage.newState);
  } catch (err) {
    if (err instanceof MassageError) res.status(400).send(err.message);
    else res.status(400).send({ message: 'error has happened' });
    return;
  }
  res.send({ package: result });
};
