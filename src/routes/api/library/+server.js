import { error } from '@sveltejs/kit';
import { getCollection } from '../db';


/** @type {import('./$types').RequestHandler} */
export async function GET({}) {
	try {
		const collection = await getCollection('library');
		const library = await collection.find().toArray();
		return new Response(JSON.stringify(library));
	} catch (e) {
		throw error(400, e);
	}
}



/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const collection = await getCollection('library');
		const library = await request.json();
		const msg = await collection.insertOne(library);
		const _id = msg.insertedId.toString();

		return new Response(
			JSON.stringify({
				_id,
				...library
			})
		);
	} catch (e) {
		throw error(400, e);
	}
}
