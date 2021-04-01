import updateDatabase from './put.js';
import express from 'express';
import MongoClient from 'mongodb';
import {MONGO_URI} from './constants.js';
import {getDiff} from './get.js';

connectMongoDB().catch(console.error).then(client => {
	const db = client.db('belcovid');
	// eslint-disable-next-line no-undef
	const hostname = process.env.HOSTNAME;
	// eslint-disable-next-line no-undef
	const port = process.env.PORT;

	const server = express();
	server.get('/:key/:fromId', async (req, res) => {
		// Get the diff between the data at given id and the latest data.
		const diff = await getDiff(db, req.params.key, req.params.fromId);
		res.statusCode = 200;
		res.send(diff);
	});
	server.get('/:key', async (req, res) => {
		// Get the full diff.
		const diff = await getDiff(db, req.params.key);
		res.statusCode = 200;
		res.send(diff);
	});
	server.get('/update', async (req, res) => {
		const updates = await updateDatabase(db);
		res.statusCode = 200;
		res.send({updated: updates});
	});

	// Handle 404 - Keep this as a last route
	server.use((req, res, next) => {
		res.status(404);
		res.send('404: File Not Found');
	});

	// listen for request on port 3000, and as a callback function have the port listened on logged
	server.listen(port, hostname, () => {
		// eslint-disable-next-line no-console
		console.log(`Server running at http://${hostname}:${port}/`);
	});
});

async function connectMongoDB() {
	const client = await new MongoClient(MONGO_URI, {useUnifiedTopology: true});
	try {
		await client.connect();
	} catch (e) {
		console.error(e);
		await client.close();
	}
	return client;
}
