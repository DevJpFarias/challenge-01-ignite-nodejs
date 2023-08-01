import { afterAll, afterEach, beforeAll, beforeEach, test, describe, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

beforeAll(async () => {
  await app.ready()
})

beforeEach(async () => {
  await request(app.server)
    .delete('/tasks')
    .send()
})

afterEach(async () => {
  await request(app.server)
    .delete('/tasks')
    .send()
})

afterAll(async () => {
  await app.close()
})

describe('Create Tasks', () => {
  test('should user cannot create a task without name', async () => {
    await request(app.server)
      .post('/tasks')
      .send({
        description: 'Descrição da task'
      })
      .expect(400)
  })
  
  test('should user cannot create a task without description', async () => {
    await request(app.server)
      .post('/tasks')
      .send({
        title: 'Titulo da task'
      })
      .expect(400)
  })
  
  test('should user can create a task', async () => {
    await request(app.server)
      .post('/tasks')
      .send({
        title: 'Titulo da task',
        description: 'Descrição da task'
      })
      .expect(201)
  })
})

describe('List Tasks', () => {
  test('should user list no tasks correctly', async () => {
    const response = await request(app.server)
      .get('/tasks')
      .send()
    
    expect(response.statusCode).toEqual(200)
    expect(response.body).toStrictEqual([])
  })
  
  test('should user list one tasks correctly', async () => {
    await request(app.server)
      .post('/tasks')
      .send({
        title: 'Titulo da task',
        description: 'Descrição da task'
      })

    const response = await request(app.server)
      .get('/tasks')
      .send()
    
    expect(response.statusCode).toEqual(200)
    expect(response.body).toHaveLength(1)
    expect(response.body[0].id).not.toBeNull()
    expect(response.body[0].created_at).not.toBeNull()
    expect(response.body[0].updated_at).toBeNull()
    expect(response.body[0].completed_at).toBeNull()
  })
  
  test('should user list many tasks correctly', async () => {
    await request(app.server)
      .post('/tasks')
      .send({
        title: 'Titulo da task',
        description: 'Descrição da task'
      })

    const response = await request(app.server)
      .get('/tasks')
      .send()
    
    expect(response.statusCode).toEqual(200)
    expect(response.body).length.greaterThanOrEqual(1)
  })
})