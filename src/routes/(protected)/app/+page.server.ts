import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, error } from '@sveltejs/kit';
import { postFormSchema } from '$lib/forms/postFormSchema';
import { createPost, getPosts, updatePost } from '$lib/server/db/core/posts';

export const load: PageServerLoad = async ({ locals }) => {
	const session = locals.session;

	const postFormData = await superValidate(zod(postFormSchema));
	const posts = await getPosts();

	if (posts.error) {
		console.error(posts.error);
		error(500, "Couldn't get posts");
	}

	if (!session && session) {
		throw redirect(401, '/sign-in');
	}

	return {
		session,
		postFormData,
		posts: posts.data
	};
};

export const actions: Actions = {
	upsertPost: async (event) => {
		const session = event.locals.session;
		if (!session?.user) {
			console.error('Authentication failed: No user session');
			return fail(401, {
				message: 'Unauthorized',
				type: 'error'
			});
		}

		console.log('Processing request for user:', {
			userId: session.user.id,
			email: session.user.email
		});

		const form = await superValidate(event, zod(postFormSchema));
		if (!form.valid) {
			console.warn('Form validation failed:', form.errors);
			return fail(400, {
				form,
				type: 'error',
				message: 'Invalid form data'
			});
		}

		const formData = form.data;
		console.log('Validated form data:', {
			formData
		});

		if (formData.id != '') {
			console.log('UPDATING POST');
			const response = await updatePost(formData.id, formData);
			if (response.error) {
				console.error('Post update failed:', response.error);
				return fail(400, {
					form,
					type: 'error',
					message: response.error || 'Failed to update post'
				});
			}

			return {
				form,
				type: 'success',
				message: 'Post updated successfully',
				post: response.data
			};
		}

		const result = await createPost(formData);
		if (result.error) {
			console.error('Post creation failed:', result.error);
			return fail(400, {
				form,
				type: 'error',
				message: result.error || 'Failed to create post'
			});
		}

		return {
			form,
			type: 'success',
			message: 'Post created successfully',
			post: result.data
		};
	}
};
