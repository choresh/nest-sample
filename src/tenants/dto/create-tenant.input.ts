import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateTenantInput {
  @Field(() => String, { description: 'name of the tenant' })
    name: string
}
