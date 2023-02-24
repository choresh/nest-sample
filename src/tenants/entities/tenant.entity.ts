import { User } from '../../users/entities/user.entity'
import { mongoose, type Ref } from '@typegoose/typegoose'
import { Entity } from '../../infra/decorators/entity'
import { Prop } from '../../infra/decorators/prop'

@Entity()
export class Tenant {
  @Prop({ primaryKey: true })
  readonly _id: mongoose.Types.ObjectId

  @Prop()
    name: string

  @Prop({
    foreignField: 'tenantId',
    nullable: true,
    type: User
  })
    users: Array<Ref<User>>
}
