import * as setupKnex from 'knex'
import path from 'node:path'

export const config: setupKnex.Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './db/app.db'
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  }
}

export const knex = setupKnex.default(config)