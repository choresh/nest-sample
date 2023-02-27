import { type ReturnTypeFunc } from '@nestjs/graphql'

export interface IResolver {
  getTypeFunc: () => ReturnTypeFunc
}
