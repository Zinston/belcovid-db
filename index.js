import updateDatabase from './updateDatabase.js';
import express from 'express';
import MongoClient from 'mongodb';
import {MONGO_URI} from './constants.js';

connectMongoDB().catch(console.error).then(client => {
	const db = client.db('belcovid');
	const hostname = '127.0.0.1';
	const port = 3000;

	const server = express();
	server.get('/', (req, res) => {
		// Set the response HTTP header with HTTP status and Content type
		res.statusCode = 200;
		res.send('Hello World\n');
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
		updateDatabase(db);
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
