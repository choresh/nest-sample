import { InputType } from '@nestjs/graphql'

@InputType()
export class CreateTenantInput {
  name: string
}
