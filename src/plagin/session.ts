import fn from 'fastify-plugin';

import { FastifyInstance } from 'fastify';

import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';

import { createClient } from 'redis';
import * as connectRedis from 'connect-redis';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RedisStore = connectRedis(fastifySession as any);

//connect to redis database
const redisClinet = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number.parseInt(process.env.REDIS_PORT)
  },
  password: process.env.REDIS_PASSWORD,
  legacyMode: true
});
redisClinet.connect().catch(console.error);

async function plugin(fastify: FastifyInstance) {
  fastify.register(fastifyCookie);
  fastify.register(fastifySession, {
    secret: process.env.SESSION_SECRET,
    store: new RedisStore({ client: redisClinet }),
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false
    }
  });
}

export default fn(plugin);
