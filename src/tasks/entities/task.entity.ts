import { mongoose } from '@typegoose/typegoose'
import { Entity } from '../../../src/infra/decorators/entity'
import { Prop } from '../../../src/infra/decorators/prop'
import { TaskDetails } from './task-details.entity'

@Entity()
export class Task {
  @Prop({ primaryKey: true })
  readonly _id: mongoose.Types.ObjectId

  @Prop()
    name: string

  @Prop()
    details: TaskDetails

  @Prop({ required: true })
    userId: string
}
