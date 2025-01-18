import { PUBLIC_URL } from '$env/static/public';
import { createAuthClient } from 'better-auth/svelte';

export const { $Infer, signIn, signUp, signOut, useSession } = createAuthClient({
	baseURL: PUBLIC_URL
});

type Session = typeof $Infer.Session.session;
type User = typeof $Infer.Session.user;

export type AuthSession = {
	session: Session;
	user: User;
};
