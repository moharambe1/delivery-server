import { FastifyReply, FastifyRequest } from 'fastify';

import { db_Manager } from '../../db/db_manager';
import { ErrorPackage } from '../../moduls/packages';

export const preHandleGetPackagesUserWithStateManager = {
  schema: {
    body: {
      phone: {
        type: 'string'
      }
    }
  }
};

export const handleGetPackagesUserWithStateManager = async (
  req: FastifyRequest<{ Body: { phone: string } }>,
  res: FastifyReply
) => {
  try {
    const acnt = await db_Manager.GetAnounClinetIdName(req.body.phone);

    if (acnt.state == true) {
      res.status(200).send({ id: acnt.id });
    } else res.status(400).send({ massage: 'لا يـوجـد عميـل بـهذا الرقـم' });
  } catch (err) {
    if (err instanceof ErrorPackage) res.status(400).send(err.message);
    else res.status(400).send({ message: 'error has happened' });
  }
};

export const preHandleGetUserPhoneManager = {
  schema: {
    body: {
      id: {
        type: 'number'
      }
    }
  }
};

export const HandleGetUserPhoneManager = async (req: FastifyRequest<{ Body: { id: number } }>, res: FastifyReply) => {
  try {
    const acnt = await db_Manager.GetAnounClinetPhoneName(req.body.id);

    if (acnt.state == true) {
      res.status(200).send({ phone: acnt.phone, name: acnt.name });
    } else res.status(400).send({ massage: 'لا يـوجـد عميـل بـهذا الرقـم' });
  } catch (err) {
    if (err instanceof ErrorPackage) res.status(400).send(err.message);
    else res.status(400).send({ message: 'error has happened' });
  }
};
