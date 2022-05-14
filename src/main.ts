import 'dotenv/config';
import fastify, { FastifyRequest } from 'fastify';
import { db_Manager } from './db/db_manager';
import { Account } from './moduls/accounts';
import { handleCreateDeliver, preHandleCreateDeliver } from './routers/create_deliver';

const server = fastify();

server.get('/ping', async () => {
  return 'pong\n';
});

server.post('/signup', async (req: FastifyRequest<{ Body: { account: Account } }>, res) => {
  if (req.body.account != undefined) db_Manager.createAccount(req.body.account);
  res.send({ message: 'hello world' });
});

server.post('/deliver/api/signup', preHandleCreateDeliver, handleCreateDeliver);

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
