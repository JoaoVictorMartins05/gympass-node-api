import { FeatchNearbyGymsUseCase } from '../fetch-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeFetchNearbyGymsUseCase() {
  const repository = new PrismaGymsRepository()
  const useCase = new FeatchNearbyGymsUseCase(repository)

  return useCase
}
