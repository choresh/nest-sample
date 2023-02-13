import { CreateTenantInput } from './create-tenant.input'
import { InputType, Int, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateTenantInput extends PartialType(CreateTenantInput) {
  @Field(() => Int, { description: 'id of the tenant' })
    id: number
}
