<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { signOut } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { LogOut } from 'lucide-svelte';
	import type { AuthSession } from '$lib/auth-client';

	let {
		session
	}: {
		session: AuthSession;
	} = $props();

	const handleLogout = async () => {
		const response = await signOut();
		if (response.error) {
			toast.error("Couldn't sign out");
		} else {
			goto('/sign-in', { invalidateAll: true });
		}
	};
</script>

<Card.Root>
	<Card.Header class="flex flex-row items-center justify-between">
		<Card.Title>Session Info</Card.Title>
		<Button variant="destructive" onclick={handleLogout} class="flex items-center gap-2">
			<LogOut class="h-4 w-4" />
			Logout
		</Button>
	</Card.Header>
	<Card.Content>
		<div class="space-y-4">
			<div>
				<h3 class="mb-2 text-lg font-medium">User Details</h3>
				<div class="grid grid-cols-2 gap-2">
					<div class="text-sm font-medium">Name:</div>
					<div class="text-sm">{session.user.name}</div>
					<div class="text-sm font-medium">Email:</div>
					<div class="text-sm">{session.user.email}</div>
				</div>
			</div>

			<div>
				<h3 class="mb-2 text-lg font-medium">Session Details</h3>
				<div class="grid grid-cols-2 gap-2">
					<div class="text-sm font-medium">Session ID:</div>
					<div class="break-all text-sm">{session.session.id}</div>
					<div class="text-sm font-medium">Expires:</div>
					<div class="text-sm">{new Date(session.session.expiresAt).toLocaleString()}</div>
				</div>
			</div>
		</div>
	</Card.Content>
</Card.Root>
