import { ORPCError, onError } from '@orpc/server'
import { CompressionPlugin, RPCHandler } from '@orpc/server/fetch'
import { RequestHeadersPlugin } from '@orpc/server/plugins'

import { router } from '~/orpc/router'

const handler = new RPCHandler(router, {
	plugins: [new CompressionPlugin(), new RequestHeadersPlugin()],
	interceptors: [
		onError((error: unknown) => {
			console.error('RPC error:', error)

			if (!(error instanceof ORPCError)) {
				throw new ORPCError('INTERNAL_SERVER_ERROR', {
					cause: error,
				})
			}
		}),
	],
})

async function handleRequest(request: Request) {
	const { response } = await handler.handle(request, {
		prefix: '/rpc',
		context: {},
	})

	return response ?? new Response('Not found', { status: 404 })
}

export const HEAD = handleRequest
export const GET = handleRequest
export const POST = handleRequest
export const PUT = handleRequest
export const PATCH = handleRequest
export const DELETE = handleRequest
