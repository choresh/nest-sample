import { Index, type Ref } from '@typegoose/typegoose'
import { Task } from '../../tasks/entities/task.entity'
import { Entity } from '../../infra/decorators/entity'
import { Prop } from '../../infra/decorators/prop'
import { Identifiable } from '../../infra/bases/identifiable'
import { Tenant } from './../../tenants/entities/tenant.entity'
import { registerEnumType } from '@nestjs/graphql'

export enum Gender {
  female = 'female',
  male = 'male'
}
registerEnumType(Gender, {
  name: 'Gender'
})

@Entity({ autopopulateChildren: true })
@Index({ tenantId: 1, name: 1 }, { unique: true })
export class User extends Identifiable {
  @Prop()
    name: string

  // @Prop()
  //   department: string

  @Prop({
    oneToMany: {
      foreignField: 'userId',
      refType: () => Task
    }
  })
    tasks: Array<Ref<Task>>

  @Prop()
    tenantId: string

  @Prop({
    manyToOne: {
      localField: 'tenantId',
      refType: () => Tenant
    }
  })
    tenant: Ref<Tenant>

  @Prop({
    enumType: () => Gender
  })
    gender: Gender

  @Prop()
    age: number
}
