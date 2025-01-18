import type { DeletePostParams } from '$lib/types';
import { deletePost } from '$lib/server/db/core/posts';
import { error, json } from '@sveltejs/kit';

export async function DELETE({ request }: { request: Request; url: URL }) {
	// get the request body
	const deletePostParams: DeletePostParams = await request.json();

	const response = await deletePost(deletePostParams.id);
	if (response.error) {
		console.error('Error creating applicant:', response.error);
		return error(500, response.error);
	}

	return json(response);
}
