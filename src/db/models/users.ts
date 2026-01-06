import type { UserId } from '../types'

import { pgTable, text, uuid } from 'drizzle-orm/pg-core'

import { timestamps } from '../utils'

export const users = pgTable('users', {
	id: uuid().primaryKey().defaultRandom().$type<UserId>(),
	name: text().notNull(),
	email: text().notNull().unique(),
	image: text(),
	...timestamps,
})
