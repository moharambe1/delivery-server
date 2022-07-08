import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { ErrorInCreatingAccount } from '../../moduls/accounts';
import { AnounClients, ReqAnounClients } from '../../moduls/anounClients';
import { ErrorPackage, Packages, ReqCreatePackagesArg } from '../../moduls/packages';

export const preHandleAddPackageManager = {
  preHandler: [
    (
      req: FastifyRequest<{ Body: { account: string; package: string } }>,
      res: FastifyReply,
      done: HookHandlerDoneFunction
    ): void => {
      try {
        if (!req.body.account) throw new ErrorInCreatingAccount('account argment is missing');
        if (!req.body.package) throw new ErrorInCreatingAccount('pakcage argment is missing');
        console.log(req.session.id);
        const account = JSON.parse(req.body.account) as ReqAnounClients;
        const packages = JSON.parse(req.body.package) as ReqCreatePackagesArg;
        console.log(packages);
        if (
          AnounClients.valid_create_anounClient_argument(account) &&
          Packages.valid_create_package_argiments(packages)
        )
          done();
        else res.status(500).send();

        console.log(packages);
      } catch (err) {
        if (err instanceof ErrorInCreatingAccount) res.status(400).send({ message: err.message });
        if (err instanceof ErrorPackage) res.status(400).send({ massage: err.message });
        console.log(err);
        res.status(400).send({ message: 'error has happened' });
      }
    }
  ]
};

export const handleAddPackageManager = async (
  req: FastifyRequest<{ Body: { account: string; package: string } }>,
  res: FastifyReply
) => {
  console.log(req.body.account);
  console.log(req.body.package);
  res.send({ message: 'package add successfully' });
};
