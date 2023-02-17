import { Field, ID, ObjectType } from '@nestjs/graphql'
import { User } from 'src/users/entities/user.entity'
import { Prop, Schema } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { ObjectId } from 'mongoose'

@ObjectType()
@Schema()
export class Task {
  @Field(() => ID)
    _id: ObjectId

  @Prop()
    title: string

  @Prop()
    description: string

  @Prop()
    userId: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User
}
