import { type Type } from '@nestjs/common'
import { Resolver as GraphqlResolver } from '@nestjs/graphql'

/**
 * Decorator that marks a class as:
 * 1) A GraphQL resolver.
 */
export function Resolver1 (entityType: Type): ClassDecorator {
  return (target: any) => {
    GraphqlResolver(() => entityType)(target) // Apply the graphql @Resolver() decorator to the class.
  }
}
