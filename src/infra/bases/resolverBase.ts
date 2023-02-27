import { Args, Query, type ReturnTypeFunc } from '@nestjs/graphql'
import { Mutation1 } from '../decorators/mutation'
import { type IResolver } from './IResolver'
import { type IService } from './iService'

export abstract class ResolverBase<ENTITY_TYPE, CREATE_INPUT_TYPE, UPDATE_INPUT_TYPE> implements IResolver {
  constructor (
    private readonly service: IService<ENTITY_TYPE, CREATE_INPUT_TYPE, UPDATE_INPUT_TYPE>,
    private readonly typeFunc: ReturnTypeFunc) {
  }

  getTypeFunc (): ReturnTypeFunc {
    return this.typeFunc
  }

  @Mutation1()
  async create (@Args('createInput') createInput: CREATE_INPUT_TYPE): Promise<ENTITY_TYPE> {
    return await this.service.create(createInput)
  }

  @Query()
  async findAll (): Promise<ENTITY_TYPE[]> {
    return await this.service.findAll()
  }

  @Query()
  async findOne (@Args('id', { type: () => String }) id: string): Promise<ENTITY_TYPE | null> {
    return await this.service.findOne(id)
  }

  @Mutation1()
  async update (@Args('updateInput') updateInput: UPDATE_INPUT_TYPE): Promise<ENTITY_TYPE> {
    return await this.service.update((updateInput as any).id, updateInput) // ZZZ
  }

  @Mutation1()
  async remove (@Args('id', { type: () => String }) id: string): Promise<void> {
    await this.service.remove(id)
  }
}
