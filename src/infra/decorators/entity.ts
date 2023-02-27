import { ObjectType } from '@nestjs/graphql'
import { Plugins } from '@typegoose/typegoose'
import * as autopopulate from 'mongoose-autopopulate'

/**
 * Decorator that marks a class as:
 * 1) A GraphQL type.
 * 2) A MongoDB document (with auto-populate of refernced documents).
 */
export function Entity (options?: { autopopulateChildren?: boolean }): ClassDecorator {
  return (target: any) => {
    if (options?.autopopulateChildren === true) {
      Plugins(autopopulate as any)(target) // Apply the typegoose @Plugins(autopopulate) decorator to the class (with 'autopopulate' plugin).
    }
    ObjectType()(target) // Apply the graphql @ObjectType() decorator to the class.
  }
}
