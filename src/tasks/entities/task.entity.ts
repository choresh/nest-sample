import { Field, ID, ObjectType } from '@nestjs/graphql'
import { mongoose, prop } from '@typegoose/typegoose'

@ObjectType()
export class Task {
  @Field(() => ID)
  readonly _id: mongoose.Types.ObjectId

  @prop()
    title: string

  @prop()
    description: string

  @prop({ required: true })
    userId: string
}
