import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { createWriteStream } from 'fs';
import morgan from 'morgan';
import path from 'path';
const port = 8080;

import redis from './config/redis';

redis.connect();

const app = express();
app.use(cors({ origin: ['127.0.0.1'] }));

// log only 4xx and 5xx responses to console
app.use(
	morgan('dev', {
		skip: function (req: Request, res: Response) {
			return res.statusCode < 400;
		},
	})
);

// log all requests to access.log
app.use(
	morgan('common', {
		stream: createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }),
	})
);

function error(err: any, req: Request, res: Response, next: NextFunction) {
	console.log('error');

	// log it
	console.error(err.stack);

	// respond with 500 "Internal Server Error".
	// res.;
	res.status(500).send('Internal Server Error');
}

app.use(error);

app.get('/', function (req: Request<object, object, object, { error: 0 | 1; throwErr: 0 | 1 }>, res: Response, next) {
	console.log('hit');

	const { error, throwErr } = req.query;
	console.log(throwErr == 1);

	if (throwErr == 1) return next(new Error('who am i'));

	const code = error == 1 ? 404 : 200;
	res.status(code).send('hello, world!');
});

app.get('/ping', (req, res) => {
	const v = redis.get<string>('who');
	if (v) {
		console.log('redis is connected');

		res.status(200).send('pong ' + v);
	}
});

app.listen(port, () => {
	console.log('Express started on port ' + port);
});
