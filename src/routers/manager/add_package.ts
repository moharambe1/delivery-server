import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { db_Manager } from '../../db/db_manager';
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
        const account = JSON.parse(req.body.account) as ReqAnounClients;
        const packages = JSON.parse(req.body.package) as ReqCreatePackagesArg;
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
  try {
    const account = JSON.parse(req.body.account) as ReqAnounClients;
    const pack = JSON.parse(req.body.package) as ReqCreatePackagesArg;

    let result = await db_Manager.GetAnounClinet(account);
    if (!result.state) {
      await db_Manager.createAnounClient(account);
      result = await db_Manager.GetAnounClinet(account);
    }
    pack.id = null;
    pack.idClient = result.id;
    const results = await db_Manager.createPackageAnoun(new Packages(pack));
    res.send({ message: 'package add successfully', id: results[0]['id'] });
  } catch (err) {
    if (err instanceof ErrorInCreatingAccount) res.status(400).send({ message: err.message });
    if (err instanceof ErrorPackage) res.status(400).send({ massage: err.message });
    console.log(err);
    res.status(400).send({ message: 'error has happened' });
  }
};
