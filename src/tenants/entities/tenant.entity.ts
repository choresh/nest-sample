import { User } from '../../users/entities/user.entity'
import { mongoose, type Ref } from '@typegoose/typegoose'
import { Entity } from '../../../src/infra/decorators/entity'
import { Prop } from '../../../src/infra/decorators/prop'

@Entity()
export class Tenant {
  @Prop({ primaryKey: true })
  readonly _id: mongoose.Types.ObjectId

  @Prop()
    name: string

  @Prop({
    ref: User,
    foreignField: 'tenantId',
    localField: '_id',
    autopopulate: true,
    nullable: true,
    graphQlType: User
  })
    // eslint-disable-next-line @typescript-eslint/array-type
    users: Ref<User>[]
}
