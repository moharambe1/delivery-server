import { FastifyReply, FastifyRequest } from 'fastify';

import { db_Manager } from '../../db/db_manager';
import { ErrorPackage } from '../../moduls/packages';
import { MassageError } from '../utls/error';

export const preHandleGetPackagesWithIdManager = {
  schema: {
    body: {
      id: {
        type: 'number'
      }
    }
  }
};

export const handleGetPackagesWithIdManager = async (
  req: FastifyRequest<{ Body: { id: number } }>,
  res: FastifyReply
) => {
  try {
    const result = await db_Manager.GetPackageWithId(req.body.id);

    res.status(200).send(result);
  } catch (err) {
    if (err instanceof ErrorPackage) res.status(400).send(err.message);
    if (err instanceof MassageError) res.status(400).send(err.message);
    else console.log(err);
    res.status(400).send({ message: 'error has happened' });
  }
};
