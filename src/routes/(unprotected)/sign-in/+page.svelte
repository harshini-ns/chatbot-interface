<script lang="ts">
	import { signIn } from '$lib/auth-client';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let email: string = $state('');
	let password: string = $state('');
	let signUpLink = $state('/sign-up');
	let callbackURL = $state('/app');

	const handleSignIn = async (email: string, password: string) => {
		await signIn.email(
			{
				email: email,
				password: password,
				callbackURL: callbackURL
			},
			{
				onError(context) {
					alert(context.error.message);
				}
			}
		);
	};
</script>

<div class="flex min-h-screen flex-col items-center justify-center px-6 py-12 sm:px-0">
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Login</Card.Title>
			<Card.Description>Enter your email below to login to your account</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input
						id="email"
						type="email"
						placeholder="email@example.com"
						required
						bind:value={email}
					/>
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
						<a href="/forget-password" class="ml-auto inline-block text-sm underline">
							Forgot your password?
						</a>
					</div>
					<Input id="password" type="password" required bind:value={password} />
				</div>
				<Button type="button" class="w-full" onclick={() => handleSignIn(email, password)}
					>Login</Button
				>
				<Button
					variant="outline"
					class="w-full"
					onclick={async () => {
						console.log('Logging in with google');
						await signIn.social({
							provider: 'google',
							callbackURL: callbackURL
						});
					}}>Login with Google</Button
				>
			</div>
			<div class="mt-4 text-center text-sm">
				Don&apos;t have an account?
				<a href={signUpLink} class="underline"> Sign up </a>
			</div>
		</Card.Content>
	</Card.Root>
</div>
