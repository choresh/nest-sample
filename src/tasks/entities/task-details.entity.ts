import { Entity } from '../../infra/decorators/entity'
import { Prop } from '../../infra/decorators/prop'

@Entity(false)
export class TaskDetails {
  @Prop()
    title: string

  @Prop()
    description: string
}
