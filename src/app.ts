import 'reflect-metadata'
import {Action, BadRequestError, createKoaServer} from "routing-controllers"
import teacherController from './teachers/controller'
import loginController from './logins/controller'
import {verify} from './jwt'

export default createKoaServer({
  cors: true,
  controllers: [
    teacherController,
    loginController
  ],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')

      try {
        return !!(token && verify(token))
      }
      catch (e) {
        throw new BadRequestError(e)
      }
    }

    return false
  },
})
