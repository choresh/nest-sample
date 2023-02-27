import { Mutation as GraphqlMutation } from '@nestjs/graphql'
import { type IResolver } from '../bases/IResolver'

/**
 * Decorator that marks a method as:
 * 1) A GraphQL mutation target.
 */

export function Mutation1 (): MethodDecorator {
  return function (target: IResolver, key: string, descriptor: PropertyDescriptor) {
    GraphqlMutation(target.getTypeFunc())(target, key, descriptor) // Apply the graphql @Field() decorator to the property.
  }
}
