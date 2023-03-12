import { Field, InputType } from '@nestjs/graphql'
import { Gender } from '../entities/user.entity'

@InputType()
export class CreateUserInput {
  @Field()
    name: string

  // @Field()
  //   department: string

  @Field()
    tenantId: string

  @Field(() => Gender)
    gender: Gender

  @Field()
    age: number
}
