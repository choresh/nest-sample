import { Field, ID, ObjectType } from '@nestjs/graphql'
import { mongoose, plugin, prop } from '@typegoose/typegoose'
import * as autopopulate from 'mongoose-autopopulate'

@plugin(autopopulate as any)
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
