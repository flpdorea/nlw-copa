import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'
import Fastify from 'fastify'

const prisma = new PrismaClient({
  log: ['query']
})

async function start() {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(cors, { origin: true })

  fastify.get('/pools/count', async () => {
    const pools = await prisma.pool.count()

    return { pools }
  })

  await fastify.listen({ port: 3000, host: '0.0.0.0' })
}

start()
