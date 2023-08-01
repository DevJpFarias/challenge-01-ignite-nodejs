import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../database";
import { randomUUID } from "crypto";
import { z } from "zod";

export async function tasksRoutes(app: FastifyInstance) {
  app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const tasks = await knex('tasks').select('*')

    return reply.status(200).send(tasks)
  })

  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      description: z.string(),
    })

    const body = createTransactionBodySchema.safeParse(request.body)

    if(body.success === false) return reply.status(400).send('Error when registering a new task, check the data!')

    await knex('tasks').insert({
      id: randomUUID(),
      title: body.data.title,
      description: body.data.description,
    })

    return reply.status(201).send('Task created successfully!')
  })

  app.delete('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await knex('tasks').delete('*')

    return reply.status(200).send('All tasks was deleted!')
  })
}