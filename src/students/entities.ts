import { BaseEntity, PrimaryColumn, PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne, RelationId } from 'typeorm'
import {IsInt, IsString, Min, MinLength, IsDate} from 'class-validator'
export type Color = 'red'|'yellow'|'green';

@Entity({name:'batches'})
export class Batch extends BaseEntity {

  @IsInt()
  @Min(1)
  @PrimaryColumn()
  id: number

  @IsDate()
  @Column('date')
  startDate: Date

  @IsDate()
  @Column('date')
  endDate: Date

  @OneToMany(_ => Student, student => student.batch, {eager:true})
  students: Student[]
}

@Entity()
export class Student extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(2)
  @Column('text')
  name: string

  @IsString()
  @Column('text', {nullable: true})
  photo: string

  @ManyToOne(_ => Batch, batch => batch.students)
  batch: Batch

  @RelationId((student: Student)=> student.batch)
  batchId: number

  @OneToMany(_ => Evaluation, evaluation => evaluation.student, {eager:true})
  evaluations: Evaluation[]
}

@Entity()
export class Evaluation extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsDate()
  @Column('date')
  date: Date

  @Column('text')
  code: Color

  @IsString()
  @Column('text', {nullable: true})
  remark: string

  @ManyToOne(_ => Student, student => student.evaluations)
  student: Student

  @RelationId((evaluation: Evaluation)=> evaluation.student)
  studentId: number
}
