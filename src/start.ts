import { startWebServer } from './server';
import { startCron } from './cron';
import { authorize } from './index';

async function start() {
	await authorize();
	await startWebServer();
	startCron();
}

start();
