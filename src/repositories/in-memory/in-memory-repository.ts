import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../users-repository'

export class InMemoryDatabase implements UserRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'id_test',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email)

    return user || null
  }
}
