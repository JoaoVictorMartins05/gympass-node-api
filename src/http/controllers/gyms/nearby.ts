import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const fetchNearbyGymsBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longetude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longetude } = fetchNearbyGymsBodySchema.parse(request.body)

  try {
    const createGymUseCase = makeFetchNearbyGymsUseCase()
    const { gyms } = await createGymUseCase.execute({
      userLatitude: latitude,
      userLongitude: longetude,
    })
    return reply.status(200).send({ gyms })
  } catch (err) {
    return reply.status(500).send()
  }
}
