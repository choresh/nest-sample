import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'first name of the user' })
    name: string
}
