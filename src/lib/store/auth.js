import { writable } from 'svelte/store';

export const profile = writable({});
export const authenticated = writable(false);
