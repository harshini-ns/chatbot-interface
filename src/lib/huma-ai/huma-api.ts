import type { paths } from '$lib/huma-ai/ai';
import createClient from 'openapi-fetch';
import { env } from '$env/dynamic/public';
const aiEndpoint = env.PUBLIC_AI_ENDPOINT || 'http://localhost:8080';

export let { GET, POST, PATCH, PUT, DELETE, HEAD, TRACE } = createClient<paths>({
	baseUrl: aiEndpoint,
	headers: {
		'Content-Type': 'application/json',
		'X-API-KEY': 'thesuperaigod'
	}
});

export const checkAIHealth = async () => {
	const response = await GET('/health', {
		params: {
			// path: { session_id: sessionId }
		}
	});

	return response.data?.message;
};
