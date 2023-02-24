import { type Type } from '@nestjs/common'
import { Field, ID } from '@nestjs/graphql'
import { Prop as TypegooseProp } from '@typegoose/typegoose'
import { type ArrayPropOptions, type BasePropOptions, type MapPropOptions, type PropOptionsForNumber, type PropOptionsForString, type VirtualOptions } from '@typegoose/typegoose/lib/types'
type TypegooseOptions = BasePropOptions | ArrayPropOptions | MapPropOptions | PropOptionsForNumber | PropOptionsForString | VirtualOptions

/**
 * Decorator that marks a property as:
 * 1) A GraphQL property.
 * 2) A MongoDB proerty.
 */
export function Prop (options: TypegooseOptions & { nullable?: boolean } & { primaryKey?: boolean } & { type?: Type } = {}) {
  return function (target: any, key: string) {
    const reflectedType = Reflect.getMetadata('design:type', target, key)
    const graphQlType = (options.type !== undefined)
      ? [options.type]
      : (options.primaryKey === true)
          ? ID
          : reflectedType

    Field(() => graphQlType, { nullable: options.nullable })(target, key) // Apply the graphql @Field() decorator to the property.

    if (options.primaryKey !== true) {
      TypegooseProp({
        ...options,
        type: reflectedType,
        required: options.required
      })(target, key) // Apply the typegoose @Prop() decorator to the property.
    }
  }
}

/*
export function Prop (options: { required?: boolean} & { foreignField?: string } & { nullable?: boolean } & { primaryKey?: boolean } & { type?: Type } = {}) {
  return function (target: any, key: string) {
    const reflectedType = Reflect.getMetadata('design:type', target, key)
    const graphQlType = (options.type !== undefined)
      ? [options.type]
      : (options.primaryKey === true)
          ? ID
          : reflectedType

    Field(() => graphQlType, { nullable: options.nullable })(target, key) // Apply the graphql @Field() decorator to the property.

    if (options.primaryKey !== true) {
      const typegooseOptions: TypegooseOptions = {
        foreignField: options.foreignField,
        localField: '_id',
        type: reflectedType,
        required: options.required,
        autopopulate: true,
        nullable: options.nullable
      }
      if (options.type !== undefined) {
        typegooseOptions.ref = options.type
      }
      TypegooseProp({
        typegooseOptions
      })(target, key) // Apply the typegoose @Prop() decorator to the property.
    }
  }
}
*/
