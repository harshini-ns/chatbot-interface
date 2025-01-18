// See https://svelte.dev/docs/kit/types#app
import type { AuthSession } from '$lib/auth-client';
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: AuthSession | null;
		}
		namespace Superforms {
			type Message = {
				type: 'error' | 'success';
				text: string;
			};
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
