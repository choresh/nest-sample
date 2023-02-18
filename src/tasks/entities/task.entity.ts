import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema } from '@nestjs/mongoose'
import { ObjectId, Schema as MongooseSchema } from 'mongoose'

@ObjectType()
@Schema()
export class Task {
  @Field(() => ID)
    _id: ObjectId

  @Prop()
    title: string

  @Prop()
    description: string

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    userId: string
}
