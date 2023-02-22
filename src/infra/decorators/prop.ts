import { Field, ID } from '@nestjs/graphql'
import { Prop as TypegooseProp } from '@typegoose/typegoose'
import { type ArrayPropOptions, type BasePropOptions, type MapPropOptions, type PropOptionsForNumber, type PropOptionsForString, type VirtualOptions } from '@typegoose/typegoose/lib/types'
type TypegooseOptions = BasePropOptions | ArrayPropOptions | MapPropOptions | PropOptionsForNumber | PropOptionsForString | VirtualOptions

/**
 * Decorator that marks a property as:
 * 1) A GraphQL property.
 * 2) A MongoDB proerty.
 */
export function Prop (options: TypegooseOptions & { nullable?: boolean } & { primaryKey?: boolean } & { graphQlType?: any } = {}) {
  return function (target: any, key: string) {
    const type = Reflect.getMetadata('design:type', target, key)
    const graphQlType = (options.graphQlType !== undefined)
      ? options.graphQlType
      : (options.primaryKey === true)
          ? ID
          : type

    Field(() => graphQlType, { nullable: options.nullable })(target, key) // Apply the graphql @Field() decorator to the property.

    if (options.primaryKey !== true) {
      TypegooseProp({
        ...options,
        type,
        required: options.required
      })(target, key) // Apply the typegoose @Prop() decorator to the property.
    }
  }
}
