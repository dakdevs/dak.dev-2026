import type { RequestHeadersPluginContext } from '@orpc/server/plugins'

import { os } from '@orpc/server'

export const publicBase = os.$context<RequestHeadersPluginContext>()
