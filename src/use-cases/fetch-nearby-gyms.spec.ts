import { expect, test, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FeatchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FeatchNearbyGymsUseCase

describe('Fecth Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FeatchNearbyGymsUseCase(gymsRepository)
  })

  test('User must fetch nearby Gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -21.3522512,
      longetude: -46.6339975,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -23.5505,
      longetude: -46.6333,
    })

    const { gyms } = await sut.execute({
      userLatitude: -21.3522512,
      userLongitude: -46.6339975,
    })

    await expect(gyms).toHaveLength(1)
    await expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ])
  })
})
