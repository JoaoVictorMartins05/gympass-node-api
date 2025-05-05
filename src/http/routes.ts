import { FastifyInstance } from 'fastify/types/instance'
import { register } from './controllers/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
}
