import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTaskDetailsInput {
  @Field()
    title: string

  @Field()
    description: string
}

@InputType()
export class CreateTaskInput {
  @Field()
    name: string

  @Field()
    userId: string

  @Field()
    details: CreateTaskDetailsInput
}
