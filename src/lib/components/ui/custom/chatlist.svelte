<script>
	let { sessions, onclickSession } = $props();

	function handleOnclick(id) {
		onclickSession(id);
	}
</script>

<div class="ChatLeftSide">
	{#each sessions as session}
		<button type="button" onclick={() => handleOnclick(session.id)} class="chat-lastMessage">
			{session.lastMessage}
		</button>
	{/each}
</div>

<style>
	.ChatLeftSide {
		background-color: #ffe3e3; /* Softer light pink */
		width: 50%;
		height: 100vh;
		padding: 1rem;
		overflow-y: auto;
		border-right: 2px solid #ddd;
	}

	.chat-lastMessage {
		background-color: #d4edda; /* Softer light green */
		color: #333;
		font-size: 1rem;
		padding: 0.75rem 1rem;
		margin: 0.5rem 0;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		width: 100%;
		text-align: left;
		transition:
			background-color 0.3s,
			transform 0.2s;
	}

	.chat-lastMessage:hover {
		background-color: #c3e6cb;
		transform: scale(1.02);
	}

	.chat-lastMessage:active {
		background-color: #b1dfbb;
		transform: scale(0.98);
	}
</style>
