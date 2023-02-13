import { InputType, Field, Int } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'name of the user' })
    name: string

  @Field(() => Int, { description: 'id of tenant that own the task' })
    tenantId: number
}
