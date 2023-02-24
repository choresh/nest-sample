import { mongoose, type Ref } from '@typegoose/typegoose'
import { Task } from '../../tasks/entities/task.entity'
import { Entity } from '../../infra/decorators/entity'
import { Prop } from '../../infra/decorators/prop'

@Entity()
export class User {
  @Prop({ primaryKey: true })
  readonly _id: mongoose.Types.ObjectId

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
