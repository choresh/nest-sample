import { InputType } from '@nestjs/graphql'

@InputType()
export class CreateTaskDetailsInput {
  title: string
  description: string
}

@InputType()
export class CreateTaskInput {
  name: string
  userId: string
  details: CreateTaskDetailsInput
}
