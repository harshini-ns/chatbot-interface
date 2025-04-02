<script>
	let { messages, onclickMessage, newMessage = $bindable() } = $props();

	console.log('messages : ', messages);

	async function newMessageCall() {
		onclickMessage(newMessage);
	}

	function handleKeyPress(event) {
		if (event.key === 'Enter' && !event.shiftKey) {
			// Shift+Enter allows new line
			event.preventDefault();
			newMessageCall();
		}
	}
</script>

<div>
	{#each messages as message}
		<div>{message.content}</div>
	{/each}
	<textarea placeholder="type here .." bind:value={newMessage} rows="1" onkeypress={handleKeyPress}
	></textarea>
	<button class="send-button" onclick={newMessageCall}> SEND </button>
</div>

<style>
	div > div {
		background-color: lightsalmon;
		padding: 0.75rem 1rem;
		margin: 0.5rem 0;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-size: 1rem;
		color: #333;
	}

	textarea {
		display: flex;
		padding: 0.75rem;
		border: 1px solid #e2e8f0;
		border-radius: 0.375rem;
		resize: none;
		font-family: inherit;
		font-size: inherit;
		line-height: 1.5;
	}

	textarea:focus {
		border-color: #3b82f6;
	}

	.send-button {
		padding: 0.75rem 1rem;
		background-color: #3b82f6;
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-size: 1rem;
		transition:
			background-color 0.3s,
			transform 0.2s;
	}

	.send-button:hover {
		background-color: #2563eb;
	}

	.send-button:active {
		background-color: #1d4ed8;
		transform: scale(0.98);
	}
</style>
