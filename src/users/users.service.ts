import { Injectable, NotFoundException } from '@nestjs/common'
import { type CreateUserInput } from './dto/create-user.input'
import { type UpdateUserInput } from './dto/update-user.input'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UsersService {
  constructor (@InjectRepository(User) private readonly repository: Repository<User>) {
  }

  async create (input: CreateUserInput): Promise<User> {
    return await this.repository.save(input)
  }

  async findAll (): Promise<User[]> {
    return await this.repository.find()
  }

  async findOne (id: string): Promise<User | null> {
    return await this.repository.findOne({ where: { id } })
  }

  async update (id: string, input: UpdateUserInput): Promise<User> {
    const edited = await this.repository.findOne({ where: { id } })
    if (edited === null) {
      throw new NotFoundException('User not found')
    }
    edited.name = (input.name ?? '')
    await edited.save()
    return edited
  }

  async remove (id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
