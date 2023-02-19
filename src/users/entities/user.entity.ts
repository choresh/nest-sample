import { Field, ID, ObjectType } from '@nestjs/graphql'
import { mongoose, plugin, prop, type Ref } from '@typegoose/typegoose'
import { Task } from '../../tasks/entities/task.entity'
import * as autopopulate from 'mongoose-autopopulate'

@plugin(autopopulate as any)
@ObjectType()
export class User {
  @Field(() => ID)
  readonly _id: mongoose.Types.ObjectId

  @prop()
    name: string

  @Field(() => [Task], { nullable: true })
  @prop({
    ref: Task,
    foreignField: 'userId',
    localField: '_id',
    autopopulate: true
  })
    // eslint-disable-next-line @typescript-eslint/array-type
    tasks: Ref<Task>[]

  @prop({ required: true })
    tenantId: string
}
