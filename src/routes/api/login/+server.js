import { error } from '@sveltejs/kit';
import { getCollection } from '../db';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const collection = await getCollection('users');
		const { email, password } = await request.json();
		const data = await collection.findOne({ email, password });

		return new Response(JSON.stringify(data));
	} catch (e) {
		throw error(400, e);
	}
}
