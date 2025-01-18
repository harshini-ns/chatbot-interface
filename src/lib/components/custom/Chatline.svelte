<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Pencil, Trash2 } from 'lucide-svelte';

	//TODO: ADD TYPE SAFETY
	let { title = '', content = '', onDelete, onEdit } = $props();
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{title}</Card.Title>
	</Card.Header>
	<Card.Content>
		<p>{content}</p>
	</Card.Content>
	<Card.Footer class="flex items-center justify-end">
		<Button variant="outline" size="sm" onclick={onEdit} class="flex items-center gap-2">
			<Pencil class="h-4 w-4" />
			Edit
		</Button>
		<Button variant="destructive" size="sm" onclick={onDelete} class="flex items-center gap-2">
			<Trash2 class="h-4 w-4" />
			Delete
		</Button>
	</Card.Footer>
</Card.Root>
