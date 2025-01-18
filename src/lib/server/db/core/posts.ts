import { db } from '../index';
import { posts } from '$lib/schema';
import { eq } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

export type NewPost = typeof posts.$inferInsert;
export type Post = typeof posts.$inferSelect;

// Create a new post
export const createPost = async (data: Pick<NewPost, 'title' | 'content' | 'authorId' | 'id'>) => {
	// Generate id
	data.id = createId();

	try {
		const [post] = await db.insert(posts).values(data).returning();
		return { data: post };
	} catch (error) {
		console.error('ERROR: ', error);
		return { error: 'Failed to create post' };
	}
};

// Get a single post by ID
export const getPost = async (id: string) => {
	try {
		const post = await db
			.select()
			.from(posts)
			.where(eq(posts.id, id))
			.then((res) => res[0]);
		return { data: post };
	} catch (error) {
		console.error('ERROR: ', error);
		return { error: 'Failed to get post' };
	}
};

// Get all posts
export const getPosts = async () => {
	try {
		const allPosts = await db.select().from(posts);
		return { data: allPosts };
	} catch (error) {
		console.error('ERROR: ', error);
		return { error: 'Failed to get posts' };
	}
};

// Update a post
export const updatePost = async (id: string, data: Partial<Pick<NewPost, 'title' | 'content'>>) => {
	try {
		const [post] = await db
			.update(posts)
			.set({
				...data,
				updatedAt: new Date()
			})
			.where(eq(posts.id, id))
			.returning();
		return { data: post };
	} catch (error) {
		console.error('ERROR: ', error);
		return { error: 'Failed to update post' };
	}
};

// Delete a post
export const deletePost = async (id: string) => {
	try {
		const [post] = await db.delete(posts).where(eq(posts.id, id)).returning();
		return { data: post };
	} catch (error) {
		console.error('ERROR: ', error);
		return { error: 'Failed to delete post' };
	}
};
