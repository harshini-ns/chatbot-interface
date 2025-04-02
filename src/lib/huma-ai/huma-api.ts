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

export const createSession = async (org_id) => {
	const response = await POST('/session', {
		body: { org_id }
	});

	return response.data?.session_id;
};

export const textFromAI = async (message, session_id) => {
	const response = await POST('/openai/chat/complete/simple', {
		body: {
			"message": message,
			"session_id": session_id
		}
	})
	return response.data?.message;

}


export const getSummaryMessagesByOrgId = async (org_id) => {
	const response = await GET('/summary-messages/{org_id}', {
		params: {
			path: { org_id: org_id }
		}
	})
	return response.data?.content;
}

export const getMessagesBySessionId = async (session_id) => {
	const response = await GET('/session-messages/{session_id}', {
		params: {
			path: { session_id: session_id }
		}
	})
	return response.data?.message;
}





