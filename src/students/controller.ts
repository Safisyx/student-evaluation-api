import {
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get,
  Body, Patch
} from 'routing-controllers'
import { Batch} from './entities'

@JsonController()
export default class GameController {

  @Authorized()
  @Post('/batches')
  @HttpCode(201)
  async createBatch(
    @Body() batch
  ) {
    await Batch.create(batch).save()
    const entity = Batch.findOneById(batch.id)
    if (!entity) throw new NotFoundError('Batch has not been created')
    return entity
  }
}
