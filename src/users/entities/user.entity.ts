import { Field, ID, ObjectType } from '@nestjs/graphql'
import { type Task } from 'src/tasks/entities/task.entity'
// import { Tenant } from 'src/tenants/entities/tenant.entity'
import { Prop, Schema } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { ObjectId } from 'mongoose'

@ObjectType()
@Schema()
export class User {
  @Field(() => ID)
    _id: ObjectId

  @Prop()
    name: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
    tasks: Task[]

  @Prop()
    tenantId: string

  /*
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' })
    tenant: Tenant
  */
}
