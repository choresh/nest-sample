import { CreateTaskInput } from './create-task.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field(() => Int, { description: 'id of the task' })
    id: number
}
