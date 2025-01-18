import type { Handle } from '@sveltejs/kit';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { auth } from '$lib/auth';

export const handle: Handle = async ({ event, resolve }) => {
	// Get session from auth API
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	// Add session to locals
	event.locals.session = session;

	// Return the result of the auth handler
	return svelteKitHandler({ event, resolve, auth });
};
