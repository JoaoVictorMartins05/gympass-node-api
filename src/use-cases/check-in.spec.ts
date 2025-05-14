import { expect, test, describe, beforeEach, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { afterEach } from 'node:test'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins'

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym.id',
      title: 'Jows Gym',
      description: 'The first gym of the family',
      phone: '1290099878',
      latitude: 0,
      longetude: 0,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('User must check-in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym.id',
      userId: 'user.id',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(checkIn.id).toEqual(expect.any(String))
  })

  test('User cannot check-in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym.id',
      userId: 'user.id',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(async () => {
      await sut.execute({
        gymId: 'gym.id',
        userId: 'user.id',
        userLatitude: 0,
        userLongitude: 0,
      })
    }).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  test('User can check-in twice in different day', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym.id',
      userId: 'user.id',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym.id',
      userId: 'user.id',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(checkIn.id).toEqual(expect.any(String))
  })

  test('User cannot check-in on a distant gym', async () => {
    await gymsRepository.create({
      id: 'gym.id2',
      title: 'Jows Gym',
      description: 'The first gym of the family',
      phone: '1290099878',
      latitude: -21.3522512,
      longetude: -46.6339975,
    })

    await expect(async () => {
      await sut.execute({
        gymId: 'gym.id2',
        userId: 'user.id',
        userLatitude: -21.3522512,
        userLongitude: -46.0911924,
      })
    }).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
