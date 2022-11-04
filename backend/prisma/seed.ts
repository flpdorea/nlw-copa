import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      avatar_url: 'https://github.com/flpdorea.png'
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Test pool',
      code: 'POL123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-02T12:00:00.666Z',
      first_team_country_code: 'DE',
      second_team_country_code: 'BR'
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-03T12:00:00.666Z',
      first_team_country_code: 'BR',
      second_team_country_code: 'AR',

      guesses: {
        create: {
          first_team_points: 2,
          second_team_points: 1,
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })
}

main()
