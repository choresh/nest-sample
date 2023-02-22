import { mongoose, type Ref } from '@typegoose/typegoose'
import { Task } from '../../tasks/entities/task.entity'
import { Entity } from 'src/infra/decorators/entity'
import { Prop } from 'src/infra/decorators/prop'

@Entity()
export class User {
  @Prop({ primaryKey: true })
  readonly _id: mongoose.Types.ObjectId

  @Prop()
    name: string

  @Prop({
    ref: Task,
    foreignField: 'userId',
    localField: '_id',
    autopopulate: true,
    nullable: true,
    graphQlType: [Task]
  })
    // eslint-disable-next-line @typescript-eslint/array-type
    tasks: Ref<Task>[]

  @Prop({ required: true })
    tenantId: string
}
