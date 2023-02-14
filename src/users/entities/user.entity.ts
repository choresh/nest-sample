import { ObjectType } from '@nestjs/graphql'
import { Task } from 'src/tasks/entities/task.entity'
import { Tenant } from 'src/tenants/entities/tenant.entity'
import { BaseEntity, Entity, Column, ObjectIdColumn, OneToMany, ManyToOne } from 'typeorm'
// import { IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
    id: string

  @Column()
  /*
  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  */
    name: string

  @OneToMany(type => Task, task => task.user, { cascade: true })
    tasks: Task[]

  @Column()
    tenantId: string

  @ManyToOne(type => Tenant, tenant => tenant.users)
    tenant: Tenant
}
