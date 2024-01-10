import { library, ministries, events } from '../store/data';

export const fetchMinistries = async () => {
	const res = await fetch('/api/ministries');
	const data = await res.json();
	ministries.set(data);
	return data;
};
export const fetchLibrary = async () => {
	const res = await fetch('/api/library');
	const data = await res.json();
	library.set(data);
	return data;
};

export const fetchEvents = async () => {
	const res = await fetch('/api/events');
	const data = await res.json();
	events.set(data);
	return data;
};
