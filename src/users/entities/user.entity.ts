import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Task } from 'src/tasks/entities/task.entity'
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
// import { IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID, { description: 'Primary key' })
  @PrimaryGeneratedColumn()
    id: number

  @Field()
  @Column()
  /*
  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  */
    name: string

  @Field(() => [Task])
  @OneToMany(type => Task, task => task.user)
    tasks: Task[]
}
