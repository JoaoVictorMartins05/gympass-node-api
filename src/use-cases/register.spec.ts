import { expect, test, describe } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryDatabase } from '@/repositories/in-memory/in-memory-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  test('User must be register', async () => {
    const inMemoryDatabase = new InMemoryDatabase()
    const registeUseCase = new RegisterUseCase(inMemoryDatabase)

    const { user } = await registeUseCase.execute({
      name: 'john',
      email: 'john@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('User hash password must be encrypted', async () => {
    const inMemoryDatabase = new InMemoryDatabase()
    const registeUseCase = new RegisterUseCase(inMemoryDatabase)

    const { user } = await registeUseCase.execute({
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
    const inMemoryDatabase = new InMemoryDatabase()
    const registeUseCase = new RegisterUseCase(inMemoryDatabase)

    const email = 'john@email.com'

    await registeUseCase.execute({
      name: 'john',
      email,
      password: '123456',
    })

    expect(async () => {
      await registeUseCase.execute({
        name: 'new john',
        email,
        password: '1234567',
      })
    }).rejects.instanceOf(UserAlreadyExistsError)
  })
})
