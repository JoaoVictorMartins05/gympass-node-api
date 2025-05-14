import { expect, test, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  test('must be able create gym', async () => {
    const { gym } = await sut.execute({
      title: 'gym-01',
      description: 'gym-01-description',
      phone: '12949173477',
      latitude: -21.3522512,
      longetude: -46.0911924,
    })

    await expect(gym.id).toEqual(expect.any(String))
  })
})
