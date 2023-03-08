import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field()
    name: string

  // @Field()
  //   department: string

  @Field()
    tenantId: string
}
