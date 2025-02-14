import { FastifyInstance } from 'fastify';
import { fromPGtoGoogle } from './fromPGtoGoogle';

export const routes = async (fastify: FastifyInstance) => {
	fastify.post<{ Body: { ids: string[] } }>('/load_data_to_google', async function handler(request, reply) {
		const ids = request.body.ids;
		await fromPGtoGoogle(ids);
		return 'okey';
	});
};
