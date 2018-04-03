import { JsonController, Post, Body, HttpCode } from 'routing-controllers'
import Teacher from './entity';

@JsonController()
export default class UserController {

  @Post('/teachers')
    @HttpCode(201)
    async signup(
      @Body() teacher: Teacher
    ) {
      const {password, ...rest} = teacher
      const entity = Teacher.create(rest)
      await entity.setPassword(password)
      return entity.save()
    }
}
