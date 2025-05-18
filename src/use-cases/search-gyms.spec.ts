import { expect, test, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  test('User must search a Gym By Name', async () => {
    await gymsRepository.create({
      title: 'Gym 1',
      description: null,
      phone: null,
      latitude: -23.5505,
      longetude: -46.6333,
    })

    await gymsRepository.create({
      title: 'Gym 2',
      description: null,
      phone: null,
      latitude: -23.5505,
      longetude: -46.6333,
    })

    const { gyms } = await sut.execute({
      query: '1',
      page: 1,
    })

    await expect(gyms).toHaveLength(1)
    await expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Gym 1',
      }),
    ])
  })

  test('User must search paginated Gyms By Name', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.5505,
        longetude: -46.6333,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 2,
    })

    await expect(gyms).toHaveLength(2)
    await expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Gym 21',
      }),
      expect.objectContaining({
        title: 'Gym 22',
      }),
    ])
  })
})
