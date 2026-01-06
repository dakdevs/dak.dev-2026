import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const isDevelopment = process.env.NODE_ENV !== 'production'

export const env = createEnv({
	client: {
		NEXT_PUBLIC_APP_HOST: z.string().url().optional(),
	},
	server: {
		DATABASE_URL: isDevelopment
			? z
					.string()
					.optional()
					.default('postgresql://postgres:postgres@localhost:5432/app')
			: z.string(),
		NODE_ENV: z.string().default('development'),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_APP_HOST: process.env.NEXT_PUBLIC_APP_HOST,
	},
})
