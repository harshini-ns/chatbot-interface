import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { user } from './auth-schema';

export const posts = pgTable('posts', {
	id: text('id')
		.primaryKey()
		.$default(() => createId()),
	title: text('title').notNull(),
	content: text('content'),
	authorId: text('author_id').references(() => user.id, { onDelete: 'cascade' }),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});
