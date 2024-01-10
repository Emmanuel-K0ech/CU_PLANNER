import { authenticated, profile } from '$lib/store/auth';

/**
 * @param {any} data
 */
export async function setProfile(data) {
	profile.set(data);
	authenticated.set(true);
	//localStorage.setItem('cu_profile', JSON.stringify(profile));
}

export async function clearProfile() {
	profile.set({});
	authenticated.set(false);
}

/**
 * @param {string} email
 */
export function isAdmin(email) {
	// @ts-ignore
	return email === 'admin@admin.admin';
}
