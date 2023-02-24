import { CreateTenantInput } from './create-tenant.input'
import { Field, InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateTenantInput extends PartialType(CreateTenantInput) {
  @Field()
    id: string
}
