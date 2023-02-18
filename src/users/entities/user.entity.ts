import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Task } from 'src/tasks/entities/task.entity'
// import { Tenant } from 'src/tenants/entities/tenant.entity'
import { Prop, Schema } from '@nestjs/mongoose'
import { ObjectId, Schema as MongooseSchema } from 'mongoose'

@ObjectType()
@Schema()
export class User {
  @Field(() => ID)
    _id: ObjectId

  @Prop()
    name: string

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: Task.name }] })
    tasks: Task[]

  @Prop()
    tenantId: string

  /*
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' })
    tenant: Tenant
  */
}
