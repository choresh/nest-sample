import { ObjectType } from '@nestjs/graphql'
import { prop } from '@typegoose/typegoose'

@ObjectType()
export class TaskDetails {
  @prop()
    title: string

  @prop()
    description: string
}
