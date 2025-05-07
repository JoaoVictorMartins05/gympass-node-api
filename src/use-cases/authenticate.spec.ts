import { expect, test, describe } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  test('User must be authenticated', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'john',
      email: 'john@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'john@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('User cannot be authenticated with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    expect(async () => {
      await authenticateUseCase.execute({
        email: 'john@email.com',
        password: '123456',
      })
    }).rejects.instanceOf(InvalidCredentialsError)
  })

  test('User cannot be authenticated with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'john',
      email: 'john@email.com',
      password_hash: await hash('123456', 6),
    })

    expect(async () => {
      await authenticateUseCase.execute({
        email: 'john@email.com',
        password: 'wrong_123456',
      })
    }).rejects.instanceOf(InvalidCredentialsError)
  })
})
