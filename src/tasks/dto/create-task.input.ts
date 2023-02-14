import { InputType } from '@nestjs/graphql'

@InputType()
export class CreateTaskInput {
  title: string
  description: string
  userId: string
}
