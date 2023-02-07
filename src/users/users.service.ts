import { Injectable } from '@nestjs/common'
import { type CreateUserInput } from './dto/create-user.input'
import { type UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UsersService {
  create (createUserInput: CreateUserInput): string {
    return 'This action adds a new user'
  }

  findAll (): string {
    return 'This action returns all users'
  }

  findOne (id: number): string {
    return `This action returns a #${id} user`
  }

  update (id: number, updateUserInput: UpdateUserInput): string {
    return `This action updates a #${id} user`
  }

  remove (id: number): string {
    return `This action removes a #${id} user`
  }
}
