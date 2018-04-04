import {
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get,
  Body, Patch
} from 'routing-controllers'
import { Batch} from './entities'
import {sortEval} from '../lib/functions'

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

  @Authorized()
  @Get('/batches')
  async getBatches(
  ){
    const batches = await Batch.find()
    return batches.filter(b=>b.id>0)
  }

  @Authorized()
  @Get('/batches/:id')
  async getBatch(
    @Param('id') id:number
  ) {
    const batch = await Batch.findOneById(id)
    if (!batch) throw new NotFoundError('Batch not found')
    return {
      ...batch,
      students: batch.students.map(student=>({
        ...student,
        evaluations: sortEval(student.evaluations)
        }
      ))
    }
  }
}
