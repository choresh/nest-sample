import { Identifiable } from '../../infra/bases/identifiable'
import { Entity } from '../../infra/decorators/entity'
import { Prop } from '../../infra/decorators/prop'
import { TaskDetails } from './task-details.entity'

@Entity()
export class Task extends Identifiable {
  @Prop()
    name: string

  @Prop()
    details: TaskDetails

  @Prop()
    userId: string
}
