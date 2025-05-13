import { Gym } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(gymId: string) {
    console.log(gymId)

    if (!this.items) {
      return null
    }

    return this.items[0]
  }
}
