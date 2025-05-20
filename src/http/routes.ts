import { FastifyInstance } from 'fastify/types/instance'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  // Protected routes
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
