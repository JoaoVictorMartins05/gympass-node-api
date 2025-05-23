import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymsQuerySchema.parse(request.query)

  try {
    const createGymUseCase = makeSearchGymsUseCase()
    const { gyms } = await createGymUseCase.execute({
      query,
      page,
    })

    return reply.status(200).send({
      gyms,
    })
  } catch (err) {
    return reply.status(500).send()
  }
}
