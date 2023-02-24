import { Entity } from '../../../src/infra/decorators/entity'
import { Prop } from '../../../src/infra/decorators/prop'

@Entity(true)
export class TaskDetails {
  @Prop()
    title: string

  @Prop()
    description: string
}
