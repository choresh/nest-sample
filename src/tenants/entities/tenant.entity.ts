import { Field, ID, ObjectType } from '@nestjs/graphql'
import { User } from '../../users/entities/user.entity'
import { mongoose, plugin, prop, type Ref } from '@typegoose/typegoose'
import * as autopopulate from 'mongoose-autopopulate'

@plugin(autopopulate as any)
@ObjectType()
export class Tenant {
  @Field(() => ID)
  readonly _id: mongoose.Types.ObjectId

  @prop()
    name: string

  @Field(() => [User], { nullable: true })
  @prop({
    ref: User,
    foreignField: 'tenantId',
    localField: '_id',
    autopopulate: true
  })
    // eslint-disable-next-line @typescript-eslint/array-type
    users: Ref<User>[]
}
