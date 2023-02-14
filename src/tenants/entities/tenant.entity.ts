import { ObjectType } from '@nestjs/graphql'
import { User } from 'src/users/entities/user.entity'
import { BaseEntity, Entity, Column, ObjectIdColumn, OneToMany } from 'typeorm'
// import { IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

@ObjectType()
@Entity()
export class Tenant extends BaseEntity {
  @ObjectIdColumn()
    _id: string

  @Column()
  /*
  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  */
    name: string

  @OneToMany(type => User, user => user.tenant, { eager: true })
    users: User[]
}
