import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string // user id
      email: string
      role: 'ADMIN' | 'MEMBER'
    }
  }
}
