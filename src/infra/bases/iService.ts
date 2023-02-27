export interface IService<ENTITY_TYPE, CREATE_INPUT_TYPE, UPDATE_INPUT_TYPE> {
  create: (input: CREATE_INPUT_TYPE) => Promise<ENTITY_TYPE>
  findAll: () => Promise<ENTITY_TYPE[]>
  findOne: (id: string) => Promise<ENTITY_TYPE | null>
  update: (id: string, input: UPDATE_INPUT_TYPE) => Promise<ENTITY_TYPE>
  remove: (id: string) => Promise<void>
}
