import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field()
    name: string

  @Field()
    tenantId: string

  @Field({ nullable: true })
    parentId: string
}
