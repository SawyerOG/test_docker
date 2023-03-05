import { createClient } from 'redis';
import type { RedisClientType } from 'redis';

class Redis {
	private redis: RedisClientType;
	private subClient: RedisClientType;

	constructor() {
		const client = createClient({ url: 'redis:6379' });
		// client.connect();
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		this.redis = client;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		this.subClient = client.duplicate();

		client.on('error', (err) => {
			console.log('Redis Client Error', err);
			if (err.code && err.code === 'ECONNREFUSED') {
				process.exit();
			}
		});
	}
	connect = async () => {
		try {
			await this.redis.connect();
			console.log('REDIS HAS CONNECT');
		} catch (err) {
			console.log('REDIS FAILED');
			console.error(err);
			process.exit();
		}
	};

	get = async <T>(key: string): Promise<T | undefined> => {
		try {
			const val = await this.redis.get(key);
			if (val) {
				return JSON.parse(val) as T;
			}
			return undefined;
		} catch (err) {
			console.error(err);
		}
	};

	// await client.set('key', 'value');
	// const value = await client.get('key');
	// await client.disconnect();
}

export default new Redis();
