import { ObjectType, Field, ID } from '@nestjs/graphql'
import { User } from 'src/users/entities/user.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@ObjectType()
@Entity()
export class Task {
  @Field(() => ID, { description: 'Primary key' })
  @PrimaryGeneratedColumn()
    id: number

  @Field()
  @Column()
    title: string

  @Field()
  @Column()
    description: string

  @Field(() => ID, { description: 'Foreign key' })
  @Column()
    userId: number

  // @Field()
  @ManyToOne(type => User, user => user.tasks)
    user: User
}
