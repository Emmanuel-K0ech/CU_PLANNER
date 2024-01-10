import { error } from '@sveltejs/kit';
import { getCollection } from '../db';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const collection = await getCollection('users');
		const auth = await request.json();
		const msg = await collection.insertOne(auth);
		const _id = msg.insertedId.toString();

		return new Response(
			JSON.stringify({
				_id,
				...auth
			})
		);
	} catch (e) {
		throw error(400, e);
	}
}
