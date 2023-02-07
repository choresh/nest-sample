import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Task } from 'src/tasks/entities/task.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@ObjectType()
@Entity()
export class User {
  @Field(() => ID, { description: 'Primary key' })
  @PrimaryGeneratedColumn()
    id: number

  @Field()
  @Column()
    name: string

  @Field(() => [Task])
  @OneToMany(type => Task, task => task.user)
    tasks: Task[]
}
