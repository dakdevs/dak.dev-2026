import { drizzle } from 'drizzle-orm/node-postgres'

import { serverConfig } from '~/config/server-config'

// biome-ignore lint/performance/noNamespaceImport: Drizzle requires namespace import for schema
import * as schema from './models'

export const db = drizzle(serverConfig.db.url, {
	schema,
	casing: 'snake_case',
})

export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0]
