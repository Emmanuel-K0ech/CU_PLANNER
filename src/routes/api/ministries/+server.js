// @ts-nocheck

import { error } from '@sveltejs/kit';
import { getCollection } from '../db';

/** @type {import('./$types').RequestHandler} */
export async function GET({}) {
	try {
		const collection = await getCollection('ministries');
		const ministries = await collection.find().toArray();
		return new Response(JSON.stringify(ministries));
	} catch (e) {
		throw error(400, e);
	}
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const collection = await getCollection('ministries');
		const ministry = await request.json();
		const msg = await collection.insertOne(ministry);
		const _id = msg.insertedId.toString();

		return new Response(
			JSON.stringify({
				_id,
				...ministry
			})
		);
	} catch (e) {
		throw error(400, e);
	}
}
