import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const fetchNearbyGymsBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longetude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longetude } = fetchNearbyGymsBodySchema.parse(request.query)

  try {
    const createGymUseCase = makeFetchNearbyGymsUseCase()
    const { gyms } = await createGymUseCase.execute({
      userLatitude: latitude,
      userLongitude: longetude,
    })
    return reply.status(200).send({ gyms })
  } catch (err) {
    console.log(err)
    return reply.status(500).send()
  }
}
