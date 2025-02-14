import { knex } from 'knex';

const config = {
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		port: 5432,
		user: 'postgres',
		database: 'wbjob',
		password: 'postgres',
	},
};

const knexInstance = knex(config);

async function getValues() {
	const usersQueryBuilder = await knexInstance('users').select('*');
	console.log(usersQueryBuilder);
}

getValues();
