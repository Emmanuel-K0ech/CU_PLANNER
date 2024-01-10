import { MongoClient } from 'mongodb';

//let uri = process.env.DB_URI;
let uri = 'mongodb+srv://kipchumbakoech1107:manu1234@cluster0.ltmi5v4.mongodb.net/test';

let dbName = 'cu_planner';

// @ts-ignore
let cachedClient = null;
// @ts-ignore
let cachedDb = null;

if (!uri) {
	throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!dbName) {
	throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

export async function connectToDatabase() {
	// @ts-ignore
	if (cachedClient && cachedDb) {
		return { client: cachedClient, db: cachedDb };
	}

	const client = await MongoClient.connect(uri, {
		//useNewUrlParser: true,
		//useUnifiedTopology: true
	});

	const db = await client.db(dbName);

	cachedClient = client;
	cachedDb = db;

	return { client, db };
}

// @ts-ignore
export const getCollection = async (collectionName) => {
	const dbConnection = await connectToDatabase();
	const db = dbConnection.db;
	const collection = db.collection(collectionName || '');
	return collection;
};