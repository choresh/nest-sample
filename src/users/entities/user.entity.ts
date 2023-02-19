import { Field, ID, ObjectType } from '@nestjs/graphql'
import { mongoose, prop, type Ref } from '@typegoose/typegoose'
import { Task } from '../../tasks/entities/task.entity'

@ObjectType()
export class User {
  @Field(() => ID)
  readonly _id: mongoose.Types.ObjectId

  @prop()
    name: string

  @Field((type) => [Task], { nullable: true })
  @prop({
    ref: () => Task,
    foreignField: 'userId',
    localField: '_id'
  })
    // eslint-disable-next-line @typescript-eslint/array-type
    tasks: Ref<Task>[]

  @prop({ required: true })
    tenantId: string
}
