import { Gym, Prisma } from '@prisma/client'

export interface GymsRepository {
  // create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findById(gymId: string): Promise<Gym | null>
}
