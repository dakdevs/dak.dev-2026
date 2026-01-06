import type { RouterClient } from '@orpc/server'
import type { router } from './router'

import { createORPCClient, onError } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'

declare global {
	var $client: RouterClient<typeof router> | undefined
}

const link = new RPCLink({
	url: `${typeof window !== 'undefined' ? window.location.origin : 'https://localhost:3000'}/rpc`,
	headers: async () => {
		if (typeof window !== 'undefined') {
			return {}
		}

		const { headers } = await import('next/headers')

		return Object.fromEntries(await headers())
	},
	interceptors: [
		onError((error) => {
			console.warn('An ORPC Error occurred:', error)
		}),
	],
})

export const client: RouterClient<typeof router> =
	globalThis.$client ?? createORPCClient(link)

export const orpcClient = createTanstackQueryUtils(client)
