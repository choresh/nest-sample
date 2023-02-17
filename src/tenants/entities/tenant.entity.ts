import { Field, ID, ObjectType } from '@nestjs/graphql'
import { type User } from 'src/users/entities/user.entity'
import { Prop, Schema } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { ObjectId } from 'mongoose'

@ObjectType()
@Schema()
export class Tenant {
  @Field(() => ID)
    _id: ObjectId

  @Prop()
    name: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    users: User[]
}
