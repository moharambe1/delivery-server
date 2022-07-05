import { FastifyReply, FastifyRequest } from 'fastify';
import { db_Manager } from '../../db/db_manager';
import { ErrorPackage } from '../../moduls/packages';

export const handleGetPackage = async (req: FastifyRequest, res: FastifyReply) => {
  let result: any[];
  try {
    if (req.session.id != undefined) result = await db_Manager.getClientPackages(req.session.id);
    else res.status(400).send({ message: 'account is missing' });
  } catch (err) {
    if (err instanceof ErrorPackage) res.status(400).send(err.message);
    else res.status(400).send({ message: 'error has happened' });
    return;
  }
  res.send({ package: result });
};
