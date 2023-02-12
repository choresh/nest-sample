import { CreateUserInput } from './create-user.input'
import { InputType, Int, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int, { description: 'id of the user' })
    id: number
}
