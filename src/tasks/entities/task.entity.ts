import { ObjectType, Field, ID } from '@nestjs/graphql'
import { User } from 'src/users/entities/user.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm'

@ObjectType()
@Entity()
export class Task extends BaseEntity {
  @Field(() => ID, { description: 'Primary key' })
  @PrimaryGeneratedColumn()
    id: number

  // @Field()
  @Column()
    title: string

  // @Field()
  @Column()
    description: string

  @Field(() => ID, { description: 'Foreign key' })
  @Column()
    userId: number

  // @Field(() => User)
  @ManyToOne(type => User, user => user.tasks, { onDelete: 'CASCADE', cascade: true })
    user: User
}
