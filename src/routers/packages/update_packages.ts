import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { ErrorPackage, Packages, ReqCreatePackagesArg } from '../../moduls/packages';

export const preHandleCreatePackage = {
  preHandler: [
    (
      req: FastifyRequest<{ Body: { package: ReqCreatePackagesArg } }>,
      res: FastifyReply,
      done: HookHandlerDoneFunction
    ): void => {
      try {
        if (Packages.valid_create_package_argiments(req.body.package)) done();
        else res.status(500).send();
      } catch (err) {
        if (err instanceof ErrorPackage) res.status(400).send({ message: err.message });
        else res.status(400).send({ message: 'error has happened' });
      }
    }
  ]
};
