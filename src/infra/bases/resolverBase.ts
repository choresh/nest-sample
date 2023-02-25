import { Resolver, Query, Args } from '@nestjs/graphql'
import { Type } from '@nestjs/common'

@Resolver()
export abstract class BaseResolver<T> {
  // constructor (private readonly repository: Repository<T>) {}

  @Query([Type])
  async findAll (): Promise<T[]> {
    // return this.repository.find()
  }

  @Query(() => Type, { nullable: true })
  async findById (@Args('id') id: number): Promise<T> {
    // return this.repository.findOne(id)
  }
}

/*

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { Resolver1 } from '../decorators/resolver'

@Resolver1(ENTITY_TYPE)
export class ResolverBase<ENTITY_TYPE, SERVICE_TYPE, CREATE_INPUT_TYPE, UPDATE_INPUT_TYPE> {
  constructor (private readonly service: SERVICE_TYPE) {
  }

  @Mutation(() => ENTITY_TYPE)
  async createTask (@Args('createTaskInput') createInput: CREATE_INPUT_TYPE): Promise<ENTITY_TYPE> {
    return await this.service.create(createInput)
  }

  @Query(() => [ENTITY_TYPE], { name: 'tasks' })
  async findAll (): Promise<ENTITY_TYPE[]> {
    return await this.service.findAll()
  }

  @Query(() => ENTITY_TYPE, { name: 'task' })
  async findOne (@Args('id', { type: () => String }) id: string): Promise<ENTITY_TYPE | null> {
    return await this.service.findOne(id)
  }

  @Mutation(() => ENTITY_TYPE)
  async updateTask (@Args('updateTaskInput') updateInput: UPDATE_INPUT_TYPE): Promise<ENTITY_TYPE> {
    return await this.service.update(updateInput.id, updateInput)
  }

  @Mutation(() => ENTITY_TYPE)
  async removeTask (@Args('id', { type: () => String }) id: string): Promise<void> {
    await this.service.remove(id)
  }
}
*/
