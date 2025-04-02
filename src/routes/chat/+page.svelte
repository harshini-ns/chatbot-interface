<script lang="ts">
	import Chatlist from '$lib/components/ui/custom/chatlist.svelte';
	import Chatwindow from '$lib/components/ui/custom/chatwindow.svelte';
	import {
		getSummaryMessagesByOrgId,
		textFromAI,
		createSession,
		getMessagesBySessionId
	} from '$lib/huma-ai/huma-api';

	let messages = $state([]);
	let newMessage = $state('');

	$effect.pre(async () => {
		const summaryResponse = await getSummaryMessagesByOrgId('891e445e-3537-4161-8cd2-62e81b684ae0');
		console.log('summary response', summaryResponse);

		for (let i = 0; i < summaryResponse.length; i++) {
			if (summaryResponse[i].content != '') {
				const sessionObject = {
					id: summaryResponse[i].session_id,
					updatedAt: summaryResponse[i].session_created_at,
					lastMessage: summaryResponse[i].content
				};
				sessions.push(sessionObject);
			}
		}
	});

	let sessions = $state([]); //[
	$inspect(sessions);

	let activeSessionId = $state(null);

	async function handleSession(id) {
		const response = await getMessagesBySessionId(id);
		messages = response;
		activeSessionId = id;
		console.log('session clicked', activeSessionId);
		console.log('response from handlesession', response);
	}

	async function addNewChat() {
		let sessionID = await createSession('891e445e-3537-4161-8cd2-62e81b684ae0');
		sessions.splice(0, 0, {
			id: sessionID,
			title: '',
			lastMessage: 'Hello, how can I assist you today?',
			updatedAt: new Date().toLocaleString(),
			messages: [
				{
					id: new Date().toLocaleString(),
					content: 'Hello, how can I assist you today?',
					sender: 'assistant',
					timestamp: new Date().toLocaleString()
				}
			]
		});
		activeSessionId = sessionID;

		console.log('ADDING A NEW CHAT', activeSessionId);
	}

	async function addNewMessages(message) {
		let data;
		messages.push({
			id: new Date().toLocaleString(),
			content: message,
			role: 'user',
			session_id: activeSessionId
		});

		newMessage = '';

		try {
			data = await textFromAI(message, activeSessionId);
			console.log('response reveived', data);
		} catch (error) {
			console.log('error fetching response');
		}

		messages.push({
			id: new Date().toLocaleString(),
			content: data,
			role: 'assistant',
			session_id: activeSessionId
		});

		sessions = sessions.map((sesh) =>
			sesh.id === activeSessionId ? { ...sesh, lastMessage: data } : sesh
		);
	}

	let loading = $state(true);
	let error = $state(null);

	async function fetchSessions() {
		loading = true;
		error = null;
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			loading = false;
		} catch (err) {
			error = 'Failed to load chat sessions. Please try again.';
			loading = false;
		}
	}
	fetchSessions();
</script>

<div class="chatPage">
	{#if loading}
		<div class="loading-state">
			<p>Loading chat sessions...</p>
		</div>
	{:else if error}
		<div class="error-state">
			<p>Error: {error}</p>
			<button onclick={() => fetchSessions()}>Retry</button>
		</div>
	{:else}
		<div>
			<button class="new-chat-button" onclick={addNewChat}> New Chat </button>
			<Chatlist {sessions} onclickSession={handleSession} />
		</div>
		{#key activeSessionId}
			{#if activeSessionId == null}
				<div class="no-chat-selected">
					<p>Select new chat or existing chats</p>
				</div>
			{:else}
				<Chatwindow bind:newMessage {messages} onclickMessage={addNewMessages}></Chatwindow>
			{/if}
		{/key}
	{/if}
</div>

<style>
	.chatPage {
		display: flex;
		background-color: lightblue;
		cursor: pointer;
	}

	.new-chat-button {
		padding: 0.75rem 1rem;
		background-color: #3b82f6;
		color: white;
		border: none;
		border-radius: 0.375rem;
		cursor: pointer;
	}

	.loading-state,
	.error-state,
	.no-chat-selected {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		gap: 1rem;
	}
</style>
