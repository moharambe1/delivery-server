import 'dotenv/config';
//import fastifySession from '@fastify/session';
import fastify from 'fastify';
import session from './plagin/session';

import { handleCreateDeliver, preHandleCreateDeliver } from './routers/deliver/create_deliver';
import { handleCreateClient, preHandleCreateClient } from './routers/client/create_client';
import { handleLoginClient, preHandleLoginClient } from './routers/client/login_client';
import { handleLoginDeliver, preHandleLoginDeliver } from './routers/deliver/login_deliver';
import { handleCreatePackage, preHandleCreatePackage } from './routers/packages/craete_packages';
import { handleGetPackage } from './routers/packages/get_packages';
import { handleCreateManager, preHandleCreateManager } from './routers/manager/create_deliver';
import { handleLoginManager, preHandleLoginManager } from './routers/manager/login_deliver';
import { isAuthenticated } from './routers/utls/authenticate';
import { handleAddPackageManager, preHandleAddPackageManager } from './routers/manager/add_package';
import {
  handleGetPackagesWithStateManager,
  preHandleGetPackagesWithStateManager
} from './routers/manager/get_packages';
import { handleChangePackageState, preHandleChangePackageState } from './routers/packages/change_package_state';

const server = fastify();

server.register(session);

server.get('/ping', async () => {
  return 'pong\n';
});

//Api

//deliver
server.post('/deliver/api/signup', preHandleCreateDeliver, handleCreateDeliver);
server.post('/deliver/api/signin', preHandleLoginDeliver, handleLoginDeliver);

//client
server.post('/client/api/signup', preHandleCreateClient, handleCreateClient);
server.post('/client/api/signin', preHandleLoginClient, handleLoginClient);

//Manager
server.post('/manager/api/signup', preHandleCreateManager, handleCreateManager);
server.post('/manager/api/signin', preHandleLoginManager, handleLoginManager);
server.post('/manager/api/addPackage', preHandleAddPackageManager, handleAddPackageManager);

server.post(
  '/manager/api/getPakagesWithState',
  preHandleGetPackagesWithStateManager,
  handleGetPackagesWithStateManager
);

server.get('/api/isLogin', (req, res) => {
  isAuthenticated(req, res, () => {
    res.status(200).send({ message: 'you are login' });
  });
});

//only authenticated routes
//server.addHook('onRequest', isAuthenticated);

//package
server.post('/api/package/create', preHandleCreatePackage, handleCreatePackage);
server.get('/api/package/get', handleGetPackage);
server.post('/api/package/changeState', preHandleChangePackageState, handleChangePackageState);

//server.post('/api/package/update',p)

//server
server.listen(8000, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
