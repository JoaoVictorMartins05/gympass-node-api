import { expect, test, describe, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInRepository)
  })

  test('User must fetch check-ins history', async () => {
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

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    await expect(checkIns).toHaveLength(2)
    await expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-01',
        user_id: 'user-01',
      }),
      expect.objectContaining({
        gym_id: 'gym-02',
        user_id: 'user-01',
      }),
    ])
  })

  test('User must fetch paginated check-ins history', async () => {
    for (let i = 1; i < 23; i++) {
      await checkInRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    await expect(checkIns).toHaveLength(2)
    await expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-21',
        user_id: 'user-01',
      }),
      expect.objectContaining({
        gym_id: 'gym-22',
        user_id: 'user-01',
      }),
    ])
  })
})
