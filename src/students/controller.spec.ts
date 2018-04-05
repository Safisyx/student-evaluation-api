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

       const response =  await request(await app.callback())
            .post('/batches')
            .set('Accept', 'application/json')
            .send(batch)
            .set('Authorization', `Bearer ${sign({id:999})}`)
            .expect(201)

    })

  test('POST /students/batches/:batchId', async () => {
      const student = {
        name:'Ultimate Test',
        photo: 'testPicture.png'
      }
      const batchId = -1
      const entity = await request(await app.callback())
            .post(`/students/batches/${batchId}`)
            .set('Accept', 'application/json')
            .send(student)
            .set('Authorization', `Bearer ${sign({id:999})}`)
            .expect(201)
    })
})
