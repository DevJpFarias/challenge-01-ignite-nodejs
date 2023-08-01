import fastify from 'fastify'
import { knex } from './database'
import { tasksRoutes } from './routes/tasks'

export const app = fastify()

app.register(tasksRoutes, {
  prefix: 'tasks'
})

app.get('/tables', async () => {
  const tables = await knex('sqlite_schema').select('*')

  return tables
})