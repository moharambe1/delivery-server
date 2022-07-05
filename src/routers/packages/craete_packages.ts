import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { db_Manager } from '../../db/db_manager';
import { ErrorPackage, Packages, ReqCreatePackagesArg } from '../../moduls/packages';

export const preHandleCreatePackage = {
  preHandler: [
    (
      req: FastifyRequest<{ Body: { package: ReqCreatePackagesArg } }>,
      res: FastifyReply,
      done: HookHandlerDoneFunction
    ): void => {
      try {
        if (!req.session.id) throw new ErrorPackage('idCreater argument is missing');
        req.body.package.idCreater = req.session.id;
        if (Packages.valid_create_package_argiments(req.body.package)) done();
        else res.status(500).send();
      } catch (err) {
        if (err instanceof ErrorPackage) res.status(400).send({ message: err.message });
        else res.status(400).send({ message: 'error has happened' });
      }
    }
  ]
};

export const handleCreatePackage = async (
  req: FastifyRequest<{ Body: { package: ReqCreatePackagesArg } }>,
  res: FastifyReply
) => {
  try {
    const pack = new Packages(req.body.package);
    if (req.body.package != undefined) await db_Manager.createPackage(pack);
    else res.status(400).send({ message: 'account is missing' });
  } catch (err) {
    if (err instanceof ErrorPackage) res.status(400).send(err.message);
    else res.status(400).send({ message: 'error has happened' });
    return;
  }
  res.send({ message: 'package added sucessfly' });
};
