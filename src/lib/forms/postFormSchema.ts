import { createInsertSchema } from 'drizzle-zod';
import { posts } from '../schema';
import { z } from 'zod';

// Basic schema from Drizzle table
export const postFormSchema = createInsertSchema(posts).extend({
	id: z.string(),
	title: z
		.string()
		.min(2, 'Post title is required')
		.max(255, 'Job title cannot exceed 500 characters'),
	content: z.string().min(2, 'Content is required').max(255, 'Content cannot be too long')
});

export type PostFormSchema = typeof postFormSchema;

// // Extended schema with strict validations
// export const strictPostFormSchema = createInsertSchema(posts).extend({
// 	title: z
// 		.string({
// 			required_error: 'Title is required',
// 			invalid_type_error: 'Title must be a string'
// 		})
// 		.min(1, { message: 'Title cannot be empty' })
// 		.max(255, { message: 'Title cannot exceed 255 characters' })
// 		.trim(),

// 	content: z
// 		.string({
// 			invalid_type_error: 'Content must be a string'
// 		})
// 		.max(50000, { message: 'Content cannot exceed 50,000 characters' })
// 		.trim()
// 		.nullable(),

// 	authorId: z
// 		.string({
// 			required_error: 'Author ID is required',
// 			invalid_type_error: 'Author ID must be a string'
// 		})
// 		.uuid({ message: 'Author ID must be a valid UUID' }),

// 	// Optional fields from the original schema
// 	id: z.string().uuid().optional(),
// 	createdAt: z.date().optional(),
// 	updatedAt: z.date().optional()
// });

// export type PostFormSchema = typeof strictPostFormSchema;
