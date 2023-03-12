import { Index, prop, type Ref } from '@typegoose/typegoose'
import { Task } from '../../tasks/entities/task.entity'
import { Entity } from '../../infra/decorators/entity'
import { Prop } from '../../infra/decorators/prop'
import { Identifiable } from '../../infra/bases/identifiable'
import { Tenant } from './../../tenants/entities/tenant.entity'
import { Field, registerEnumType } from '@nestjs/graphql'

export enum Gender {
  female,
  male
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
      ref: () => Task
    }
  })
    tasks: Array<Ref<Task>>

  @Prop()
    tenantId: string

  @Prop({
    manyToOne: {
      localField: 'tenantId',
      ref: () => Tenant
    }
  })
    tenant: Ref<Tenant>

  @Field(() => Gender)
  @prop(() => Gender)
    gender: Gender

  @Prop()
    age: number
}
