<script lang="ts">
	let { data } = $props();

	import PostForm from '$lib/forms/postForm.svelte';
	import Chatline from '$lib/components/custom/Chatline.svelte';
	import type { Post } from '$lib/server/db/core/posts';
	import type { DeletePostParams } from '$lib/types';
	import * as Dialog from '$lib/components/ui/dialog';
	import SessionDisplay from '$lib/components/custom/SessionDisplay.svelte';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';
	import { checkAIHealth } from '$lib/huma-ai/huma-api.js';

	const session = data.session;
	let posts = $state(data.posts);
	let selectedPost: Post | undefined = $state(undefined);
	let showCreatePostModal: boolean = $state(false);

	const handlePostCreation = () => {
		selectedPost = undefined;
		showCreatePostModal = true;
	};

	const handleGetAIHealth = async () => {
		const response = await checkAIHealth();

		if (response) {
			toast.success('AI is healthy');
		} else {
			toast.error('AI is not healthy');
		}
	};

	const handlePostDeletion = async (id: string) => {
		const response = await fetch(`/app/api/posts`, {
			method: 'DELETE',
			body: JSON.stringify({
				id
			} as DeletePostParams)
		});

		if (!response.ok) {
			const responseJSON = await response.json();
			toast.error(responseJSON.message);
		} else {
			toast.success('Successfully deleted');

			// Updatre local state
			posts = posts!.filter((post) => post.id !== id);
		}
	};

	const handlePostEdit = (post: Post) => {
		// Select Post
		selectedPost = post;
		showCreatePostModal = true;
	};
</script>

<SessionDisplay {session} />
<br />
<Button onclick={handlePostCreation}>Create Post</Button>
{#if posts}
	{#each posts as post}
		<Chatline
			title={post.title}
			content={post.content!}
			onDelete={() => handlePostDeletion(post.id)}
			onEdit={() => handlePostEdit(post)}
		/>
	{/each}
{/if}

<!-- Create Post Dialog -->
<Dialog.Root bind:open={showCreatePostModal}>
	<Dialog.Content class="max-h-[90vh] max-w-3xl overflow-y-auto">
		<div>
			<PostForm data={data.postFormData} existingData={selectedPost} />
		</div>
	</Dialog.Content>
</Dialog.Root>

<button onclick={handleGetAIHealth}>Check AI Health</button>
