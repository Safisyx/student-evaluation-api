import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import teacherController from './teachers/controller'

export default createKoaServer({
  cors: true,
  controllers: [
    teacherController
  ]
})
