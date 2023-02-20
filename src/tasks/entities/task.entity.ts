import { Field, ID, ObjectType } from '@nestjs/graphql'
import { mongoose, plugin, prop } from '@typegoose/typegoose'
import * as autopopulate from 'mongoose-autopopulate'
import { TaskDetails } from './task-details.entity'

@plugin(autopopulate as any)
@ObjectType()
export class Task {
  @Field(() => ID)
  readonly _id: mongoose.Types.ObjectId

  @prop()
    name: string

  @prop()
    details: TaskDetails

  @prop({ required: true })
    userId: string
}
