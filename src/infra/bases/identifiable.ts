import { ObjectId } from 'mongoose'
import { Entity } from '../decorators/entity'
import { Prop } from '../decorators/prop'

@Entity()
export class Identifiable {
  @Prop({ primaryKey: true })
  readonly _id: ObjectId
}
