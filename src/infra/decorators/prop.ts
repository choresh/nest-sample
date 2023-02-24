import { type Type } from '@nestjs/common'
import { Field, ID } from '@nestjs/graphql'
import { Prop as TypegooseProp } from '@typegoose/typegoose'
import { type ArrayPropOptions, type BasePropOptions, type MapPropOptions, type PropOptionsForNumber, type PropOptionsForString, type VirtualOptions } from '@typegoose/typegoose/lib/types'
type TypegooseOptions = BasePropOptions | ArrayPropOptions | MapPropOptions | PropOptionsForNumber | PropOptionsForString | VirtualOptions

export interface OneToMany {
  foreignField: string
}

/**
 * Decorator that marks a property as:
 * 1) A GraphQL property.
 * 2) A MongoDB proerty.
 */

export function Prop (options: { nullable?: boolean } & { primaryKey?: boolean } & { type?: Type } & { oneToMany?: OneToMany } & { required?: boolean } = {}) {
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
      }
      if (options.type !== undefined) {
        typegooseOptions.ref = options.type
        typegooseOptions.localField = '_id'
        typegooseOptions.autopopulate = true
        typegooseOptions.type = reflectedType
      }
      if (options.required !== undefined) {
        typegooseOptions.required = options.required
      }
      if (options.oneToMany !== undefined) {
        typegooseOptions.foreignField = options.oneToMany.foreignField
      }
      TypegooseProp(typegooseOptions)(target, key) // Apply the typegoose @Prop() decorator to the property.
    }
  }
}
