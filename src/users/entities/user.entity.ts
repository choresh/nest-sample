import { type Ref } from '@typegoose/typegoose'
import { Task } from '../../tasks/entities/task.entity'
import { Entity } from '../../infra/decorators/entity'
import { Prop } from '../../infra/decorators/prop'
import { Identifiable } from '../../infra/bases/identifiable'

@Entity({ autopopulateChildren: true })
export class User extends Identifiable {
  @Prop()
    name: string

  @Prop({
    oneToMany: {
      foreignField: 'userId'
    },
    nullable: true,
    type: Task
  })
    tasks: Array<Ref<Task>>

  @Prop({ required: true })
    tenantId: string
}
