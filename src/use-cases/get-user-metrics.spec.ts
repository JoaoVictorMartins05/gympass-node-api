import { expect, test, describe, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInRepository)
  })

  test('User must get your check-ins count from metrics', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
      created_at: new Date(),
    })

    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
      created_at: new Date(),
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    await expect(checkInsCount).toEqual(2)
  })
})
