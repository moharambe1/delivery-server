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

//only authenticated routes
//server.addHook('onRequest', isAuthenticated);

//package
server.post('/api/package/create', preHandleCreatePackage, handleCreatePackage);
server.get('/api/package/get', handleGetPackage);

//server.post('/api/package/update',p)

//server
server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
