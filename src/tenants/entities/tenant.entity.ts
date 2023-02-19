import { Field, ID, ObjectType } from '@nestjs/graphql'
import { User } from 'src/users/entities/user.entity'
import { mongoose, prop, type Ref } from '@typegoose/typegoose'

@ObjectType()
export class Tenant {
  @Field(() => ID)
  readonly _id: mongoose.Types.ObjectId

  @prop()
    name: string

  @Field((type) => [User], { nullable: true })
  @prop({
    ref: () => User,
    foreignField: 'tenantId',
    localField: '_id'
  })
    // eslint-disable-next-line @typescript-eslint/array-type
    users: Ref<User>[]
}
