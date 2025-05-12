import { expect, test, describe, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  test('User must be authenticated', async () => {
    await usersRepository.create({
      name: 'john',
      email: 'john@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'john@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('User cannot be authenticated with wrong email', async () => {
    expect(async () => {
      await sut.execute({
        email: 'john@email.com',
        password: '123456',
      })
    }).rejects.instanceOf(InvalidCredentialsError)
  })

  test('User cannot be authenticated with wrong password', async () => {
    await usersRepository.create({
      name: 'john',
      email: 'john@email.com',
      password_hash: await hash('123456', 6),
    })

    expect(async () => {
      await sut.execute({
        email: 'john@email.com',
        password: 'wrong_123456',
      })
    }).rejects.instanceOf(InvalidCredentialsError)
  })
})
