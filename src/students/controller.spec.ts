import 'jest'
import * as request from 'supertest'
import app from '../app'
import setupDb from '../db'
import {sign} from '../jwt'

beforeAll(async () => {
  await setupDb()
})

describe('studentsController', () => {
  test('POST /batches', async () => {

        const batch = {
            id: -1,
            startDate: '2018-03-02',
            endDate: '2018-05-05'
        }

        await request(await app.callback())
            .post('/batches')
            .set('Accept', 'application/json')
            .send(batch)
            .set('Authorization', `Bearer ${sign({id:999})}`)
            .expect(201)

    })

  test('POST /students/batches/:batchId', async () => {
      const student = {
        id:-1,
        name:'Ultimate Test',
        photo: 'testPicture.png'
      }
      const batchId = -1
      await request(await app.callback())
            .post(`/students/batches/${batchId}`)
            .set('Accept', 'application/json')
            .send(student)
            .set('Authorization', `Bearer ${sign({id:999})}`)
            .expect(201)
    })

  test('PATCH /students/:id' , async () => {
    const update = {
      name: 'Test Me',
      photo: 'test.jpg'
    }
    await request(await app.callback())
          .patch(`/students/${-1}`)
          .set('Accept', 'application/json')
          .send(update)
          .set('Authorization', `Bearer ${sign({id:999})}`)
          .expect(200)

  })

  test('POST /evaluations/students/:studentId should post a new one if it is not there yet', async () => {
    const update = {
      code: 'green',
      date: '2018-01-01'
    }
    await request(await app.callback())
          .post(`/evaluations/students/${-1}`)
          .set('Accept', 'application/json')
          .send(update)
          .set('Authorization', `Bearer ${sign({id:999})}`)
          .expect(200)
  })

  test('POST /evaluations/students/:studentId should patch if it is already there', async () => {
    const update = {
      code: 'red',
      date: '2018-01-01'
    }
    await request(await app.callback())
          .post(`/evaluations/students/${-1}`)
          .set('Accept', 'application/json')
          .send(update)
          .set('Authorization', `Bearer ${sign({id:999})}`)
          .expect(200)
  })

  test('DELETE /students/:id' , async () => {
      await request(await app.callback())
          .delete(`/students/${-1}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${sign({id:999})}`)
          .expect(200)

  })
})
