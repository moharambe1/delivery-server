import { FastifyReply, FastifyRequest } from 'fastify';

import { db_Manager } from '../../db/db_manager';
import { ErrorPackage, StatePackageEnum } from '../../moduls/packages';

export const preHandleGetUserIdManager = {
  schema: {
    body: {
      phone: {
        type: 'string'
      }
    }
  }
};

export const handleGetUserIdManager = async (
  req: FastifyRequest<{ Body: { phone: string; state: StatePackageEnum } }>,
  res: FastifyReply
) => {
  try {
    const acnt = await db_Manager.GetAnounClinetIdName(req.body.phone);

    if (acnt.state == true) {
      res.status(200).send({ name: acnt.name, id: acnt.id });
    } else res.status(400).send('لا يـوجـد عميـل بـهذا الرقـم');
  } catch (err) {
    if (err instanceof ErrorPackage) res.status(400).send(err.message);
    else res.status(400).send({ message: 'error has happened' });
  }
};
