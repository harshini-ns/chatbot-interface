import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const random = pgTable('random', {
	id: text('id')
		.primaryKey()
		.$default(() => createId()),
	randomNumber: integer('random_number').notNull().default(0),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});
