import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateTaskInput {
  @Field(() => String, { description: 'title of the task' })
    title: string

  @Field(() => String, { description: 'description of the task' })
    description: string

  @Field(() => Int, { description: 'id of user that own the task' })
    userId: number
}
