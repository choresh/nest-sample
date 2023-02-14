import { ObjectType } from '@nestjs/graphql'
import { User } from 'src/users/entities/user.entity'
import { Entity, Column, ObjectIdColumn, ManyToOne, BaseEntity } from 'typeorm'

@ObjectType()
@Entity()
export class Task extends BaseEntity {
  @ObjectIdColumn()
    id: string

  @Column()
    title: string

  @Column()
    description: string

  @Column()
    userId: string

  @ManyToOne(type => User, user => user.tasks)
    user: User
}
