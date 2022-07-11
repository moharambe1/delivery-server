import { FastifyReply, FastifyRequest, FastifySchema, HookHandlerDoneFunction } from 'fastify';
import { db_Manager } from '../../db/db_manager';
import { RoleEnum } from '../../moduls/accounts';
import { ErrorPackage, Packages, ReqChangeStateArg } from '../../moduls/packages';
import { MassageError } from '../utls/error';

const schemaChangePackageState: FastifySchema = {
  body: {
    package: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        newState: { type: 'string' }
      },
      required: ['id', 'newState']
    }
  }
};

export const preHandleChangePackageState = {
  schema: schemaChangePackageState,
  preHandler: [
    (
      req: FastifyRequest<{ Body: { package: ReqChangeStateArg } }>,
      res: FastifyReply,
      done: HookHandlerDoneFunction
    ): void => {
      try {
        if (Packages.valid_Change_Package_State(req.body.package)) done();
        else res.status(500).send();
      } catch (err) {
        if (err instanceof ErrorPackage) res.status(400).send({ message: err.message });
        else res.status(400).send({ message: 'error has happened' });
      }
    }
  ]
};

export const handleChangePackageState = async (
  req: FastifyRequest<{ Body: { package: ReqChangeStateArg } }>,
  res: FastifyReply
) => {
  let result: unknown[];
  try {
    const tpackage = req.body.package;
    if (req.session.id != undefined)
      result = await db_Manager.ChangeStatePackage(tpackage.id, tpackage.newState, RoleEnum.MANAGER);
  } catch (err) {
    if (err instanceof MassageError) res.status(400).send(err.message);
    else res.status(400).send({ message: 'error has happened' });
    return;
  }
  res.send({ package: result });
};
