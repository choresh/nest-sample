import { User } from '../../users/entities/user.entity'
import { type Ref } from '@typegoose/typegoose'
import { Entity } from '../../infra/decorators/entity'
import { Prop } from '../../infra/decorators/prop'
import { Identifiable } from '../../infra/bases/identifiable'

@Entity({ autopopulateChildren: true })
export class Tenant extends Identifiable {
  @Prop()
    name: string

  @Prop({
    oneToMany: {
      foreignField: 'tenantId',
      ref: () => User
    }
  })
    users: Array<Ref<User>>
}
