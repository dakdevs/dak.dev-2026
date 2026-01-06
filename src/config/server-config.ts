import { env, isDevelopment } from './env'

export const serverConfig = {
	app: {
		isDevelopment,
	},
	db: {
		url: env.DATABASE_URL,
	},
}
