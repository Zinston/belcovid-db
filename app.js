import MongoClient from 'mongodb';

export default async function app() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = `mongodb+srv://Zinston:${process.env.MONGO_PASSWORD}@belcovidcluster.pz4dd.mongodb.net/belcovid?retryWrites=true&w=majority`;
    const client = await new MongoClient(uri, {useUnifiedTopology: true});
    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}
