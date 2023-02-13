import { ObjectType, Field, ID } from '@nestjs/graphql'
import { User } from 'src/users/entities/user.entity'
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
// import { IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

@ObjectType()
@Entity()
export class Tenant extends BaseEntity {
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
  @OneToMany(type => User, user => user.tenant, { eager: true })
    users: User[]
}
