<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';
	import { Pencil, Save } from 'lucide-svelte';
	import { postFormSchema, type PostFormSchema } from './postFormSchema';
	import type { Post } from '$lib/server/db/core/posts';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import SuperDebug, { type SuperValidated, type Infer } from 'sveltekit-superforms';

	let {
		data,
		existingData
	}: { data: SuperValidated<Infer<PostFormSchema>>; existingData: Post | undefined } = $props();

	const form = superForm(data, {
		dataType: 'json',
		validators: zodClient(postFormSchema),
		resetForm: true,
		taintedMessage: 'You have unsaved changes. Are you sure you want to leave?',
		onUpdated({ form }) {
			if (form.message) {
				if (form.message.type === 'success') {
					toast.success('Post saved successfully!');
				} else {
					toast.error(form.message.text);
				}
			}
		}
	});

	const {
		form: postFormData,
		// enhance: postEnhance,
		submitting: postSubmitting
	} = form;

	$effect.pre(() => {
		if (existingData) {
			$postFormData.id = existingData.id;
			$postFormData.content = existingData.content!;
			$postFormData.title = existingData.title;
			$postFormData.authorId = existingData.authorId;
		}
	});
</script>

<!-- <SuperDebug data={$postFormData} /> -->
<div class="bg-background">
	<form method="POST" action="?/upsertPost" class="space-y-8">
		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center gap-2">
					<Pencil class="h-5 w-5 text-primary" />
					Create Post
				</Card.Title>
				<Card.Description>Share your thoughts with the world</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-6">
				<!-- Title Field -->
				<Form.Field {form} name="id" class="hidden">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>id</Form.Label>
							<Input type="text" {...props} bind:value={$postFormData.id} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<!-- Title Field -->
				<Form.Field {form} name="title">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Title</Form.Label>
							<Input
								type="text"
								{...props}
								bind:value={$postFormData.title}
								placeholder="Enter post title"
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<!-- Content Field -->
				<Form.Field {form} name="content">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Content</Form.Label>
							<textarea
								class="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								{...props}
								bind:value={$postFormData.content}
								placeholder="Write your post content here..."
							></textarea>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</Card.Content>
		</Card.Root>

		<!-- Submit Button -->
		<div class="flex justify-end">
			<Button type="submit" class="gap-2" disabled={$postSubmitting}>
				{#if $postSubmitting}
					Saving...
				{:else}
					<Save class="h-4 w-4" />
					Save Post
				{/if}
			</Button>
		</div>
	</form>
</div>
