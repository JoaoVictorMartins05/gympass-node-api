import { expect, test, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  test('User must be register', async () => {
    const { user } = await sut.execute({
      name: 'john',
      email: 'john@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('User hash password must be encrypted', async () => {
    const { user } = await sut.execute({
      name: 'john',
      email: 'john@email.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  test('User must not have duplicate email', async () => {
    const email = 'john@email.com'

    await sut.execute({
      name: 'john',
      email,
      password: '123456',
    })

    expect(async () => {
      await sut.execute({
        name: 'new john',
        email,
        password: '1234567',
      })
    }).rejects.instanceOf(UserAlreadyExistsError)
  })
})
