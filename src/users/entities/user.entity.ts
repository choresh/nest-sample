import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Task } from 'src/tasks/entities/task.entity'
import { Tenant } from 'src/tenants/entities/tenant.entity'
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm'
// import { IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID, { description: 'Primary key' })
  @PrimaryGeneratedColumn()
    id: number

  // @Field()
  @Column()
  /*
  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  */
    name: string

  // @Field(() => [Task])
  @OneToMany(type => Task, task => task.user, { eager: true })
    tasks: Task[]

  @Field(() => ID, { description: 'Foreign key' })
  @Column()
    tenantId: number

  // @Field(() => Tenant)
  @ManyToOne(type => Tenant, tenant => tenant.users, { onDelete: 'CASCADE', cascade: true } )
    tenant: Tenant
}
