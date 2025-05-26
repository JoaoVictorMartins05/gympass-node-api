import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('History Check-In (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list the history of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const { id } = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        description: 'Some description.',
        phone: '1199999999',
        latitude: -27.2092052,
        longetude: -49.6401091,
      },
    })

    const { id: userId } = await prisma.user.findFirstOrThrow()

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: id,
          user_id: userId,
        },
        {
          gym_id: id,
          user_id: userId,
        },
      ],
    })

    const response = await request(app.server)
      .get(`/check-ins/history`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)

    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: id,
        user_id: userId,
      }),
      expect.objectContaining({
        gym_id: id,
        user_id: userId,
      }),
    ])
  })
})
