import Fastify, { FastifyInstance } from 'fastify';
import { routes } from './routes';

export async function startWebServer() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(routes);

  fastify.listen({ port: 3000 });
}
