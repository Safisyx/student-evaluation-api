import {
  JsonController, Authorized, Post, Param, HttpCode, NotFoundError, BadRequestError, Get,
  Body, Patch, Delete
} from 'routing-controllers'
import { Batch, Student, Evaluation} from './entities'
import {sortEval, getColorPercentage, getLastColors, randomPick} from '../lib/functions'

@JsonController()
export default class GameController {

  @Authorized()
  @Post('/batches')
  @HttpCode(201)
  async createBatch(
    @Body() batch
  ) {
    if (batch.endDate<batch.startDate) throw new BadRequestError('Incompatible dates')
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
    const lastColors = getLastColors(batch.students)
    return {
      ...batch,
      students: batch.students.map(student=>({
        ...student,
        evaluations: sortEval(student.evaluations)
        }
      )),
      colorsPercentage: {
        red: getColorPercentage(lastColors,'red'),
        green: getColorPercentage(lastColors,'green'),
        yellow: getColorPercentage(lastColors,'yellow')
      }
    }
  }

  @Authorized()
  @Post('/students/batches/:batchId')
  @HttpCode(201)
  async addStudent(
    @Param('batchId') batchId: number,
    @Body() student
  ) {
    const batch= await Batch.findOneById(batchId)
    if (!batch) throw new NotFoundError('Batch not found')

    const entity = await Student.create({...student, batch}).save()
    return await Student.findOneById(entity.id)
  }

  @Authorized()
  @Patch('/students/:id')
  async editStudent(
    @Param('id') id: number,
    @Body() {name, photo}
  ) {
    const student = await Student.findOneById(id)
    if (!student) throw new NotFoundError('Student not exist')
    if (name) student.name=name
    if (photo) student.photo=photo
    await student.save()
    return student
  }

  @Authorized()
  @Get('/students/:id')
  async getStudent(
    @Param('id') id:number
  ) {
    const student = await Student.findOneById(id)
    if (!student) throw new NotFoundError('Student does not exist')

    return student
  }

  @Authorized()
  @Delete('/students/:id')
  async deleteStudent(
    @Param('id') id: number
  ){
    const student = await Student.findOneById(id)
    if (!student) throw new NotFoundError('Student not exist')

    //First delete evaluations
    const evaluations = await Evaluation.find({student})
    await evaluations.forEach(evaluation => evaluation.remove())

    await student.remove()
    return {
      message: 'Succefully removed'
    }
  }

  @Authorized()
  @Post('/evaluations/students/:studentId')
  async addEvaluation(
    @Param('studentId') studentId: number,
    @Body() update
  ) {
    const student= await Student.findOneById(studentId)
    if (!student) throw new NotFoundError('Student not found')

    const evaluation = await Evaluation.findOne({student,date:update.date})
    if (!evaluation){
      const entity = await Evaluation.create({...update, student}).save()
      return {
        post: await Evaluation.findOneById(entity.id)
      }
    }
    evaluation.code=update.code
    return{
      patch: await evaluation.save()
    }
  }

//Can be public because there is no interaction with the database
//Just to make sure to have the logic in the backend
  @Post('/students/random')
  getRandom(
    @Body() students
  ){
    return randomPick(students)
  }
}
