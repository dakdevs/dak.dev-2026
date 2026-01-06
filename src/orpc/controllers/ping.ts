import { os } from '@orpc/server'

export default os.handler(() => ({ ping: 'pong' }))
