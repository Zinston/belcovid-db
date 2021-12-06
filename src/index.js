import express from 'express';
import MongoClient from 'mongodb';
import {MONGO_URI} from './constants.js';
import {getDiff} from './get.js';
import {updateDatabase} from './put.js';
import cors from 'cors';

connectMongoDB().catch(console.error).then(client => {
	const db = client.db('belcovid');

	const server = express();
	cors({credentials: true, origin: true});
	server.use(cors());

	server.get('/update', async (req, res) => {
		const updates = await updateDatabase(db);
		res.statusCode = 200;
		res.json({updated: updates});
	});
	server.get('/update-time', async (req, res) => {
		const updateTimes = await db.collection('lastUpdate').find().toArray();
		res.statusCode = 200;
		res.json(updateTimes[updateTimes.length - 1]);
	});
	server.get('/get/:key/:fromId?', async (req, res) => {
		// Get the diff between the data at given id and the latest data.
		const diff = await getDiff(db, req.params.key, req.params.fromId);
		res.statusCode = 200;
		res.json(diff);
	});

	// Handle 404 - Keep this as a last route
	server.use((req, res, next) => {
		res.status(404);
		res.send('404: File Not Found');
	});

	// listen for request on port 3000, and as a callback function have the port listened on logged
	// eslint-disable-next-line no-undef
	server.listen(process.env.PORT || 3000, () => {
		// eslint-disable-next-line no-console,no-undef
		console.log(`Listening to port ${process.env.PORT || 3000}`);
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
