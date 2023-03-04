import { type Ref } from '@typegoose/typegoose'
import { Task } from '../../tasks/entities/task.entity'
import { Entity } from '../../infra/decorators/entity'
import { Prop } from '../../infra/decorators/prop'
import { Identifiable } from '../../infra/bases/identifiable'
import { Tenant } from 'src/tenants/entities/tenant.entity'

@Entity({ autopopulateChildren: true })
export class User extends Identifiable {
  @Prop()
    name: string

  @Prop({
    oneToMany: {
      foreignField: 'userId',
      ref: () => Task
    }
  })
    tasks: Array<Ref<Task>>

  /*
  @Prop()
    tenantId: string
  */

  /*
  @Prop({
    manyToOne: {
      localField: 'tenantId',
      ref: () => Tenant
    }
  })
    tenant: Ref<Tenant>
  */
}
