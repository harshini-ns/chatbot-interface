import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const session = locals.session;

	if (!session && url.pathname.startsWith('/app')) {
		throw redirect(302, '/sign-in');
	}

	return {
		session: session
	};
};
