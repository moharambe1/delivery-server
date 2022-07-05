import { FastifyReply } from 'fastify';

export const isAuthenticated = (req, res: FastifyReply, done) => {
  if (req.session.id) done();
  res.status(401).send('you are not login');
};

export const isNotAuthenticated = (req, res, done) => {
  if (req.session.id) {
    res.status(400).send('you are login');
    return;
  }
  done();
};
