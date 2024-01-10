import { error } from '@sveltejs/kit';
import { getCollection } from '../db';

/** @type {import('./$types').RequestHandler} */
export async function GET({}) {
	try {
		const collection = await getCollection('events');
		const events = await collection.find().toArray();
		return new Response(JSON.stringify(events));
	} catch (e) {
		throw error(400, e);
	}
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const collection = await getCollection('events');
		const events = await request.json();
		const msg = await collection.insertOne(events);
		const _id = msg.insertedId.toString();

		return new Response(
			JSON.stringify({
				_id,
				...events
			})
		);
	} catch (e) {
		throw error(400, e);
	}
}
