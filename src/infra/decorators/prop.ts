import { type Type } from '@nestjs/common'
import { Field, ID, type ReturnTypeFunc } from '@nestjs/graphql'
import { Prop as TypegooseProp } from '@typegoose/typegoose'
import { type ArrayPropOptions, type BasePropOptions, type MapPropOptions, type PropOptionsForNumber, type PropOptionsForString, type VirtualOptions } from '@typegoose/typegoose/lib/types'
type TypegooseOptions = BasePropOptions | ArrayPropOptions | MapPropOptions | PropOptionsForNumber | PropOptionsForString | VirtualOptions

export interface OneToMany {
  foreignField: string
}

export interface ManyToOne {
  localField: string
}

const PRIMARY_KEYS_NAME = '_id'
const PRIMARY_KEYS_TYPE = ID

/**
 * Decorator that marks a property as:
 * 1) A GraphQL property.
 * 2) A MongoDB proerty.
 */

export function Prop (options: { nullable?: boolean } & { primaryKey?: boolean } & { ref?: () => Type<any> } & { oneToMany?: OneToMany } & { manyToOne?: ManyToOne } & { required?: boolean } = {}) {
  return function (target: any, key: string) {
    const reflectedType = Reflect.getMetadata('design:type', target, key)

    if ((options.ref !== undefined) && (options.primaryKey === true)) {
      throw new Error(`Options 'ref' and 'primaryKey' cannot defined togather, at '@Prop()' decorator, above property '${target.constructor.name as string}.${key}'`)
    }

    const graphQlType: ReturnTypeFunc = (options.ref !== undefined)
      ? (reflectedType.name === 'Array')
          ? () => [options.ref?.()]
          : options.ref
      : (options.primaryKey === true)
          ? () => PRIMARY_KEYS_TYPE
          : () => reflectedType

    Field(graphQlType, { nullable: options.nullable })(target, key) // Apply the graphql @Field() decorator to the property.

    if (options.primaryKey !== true) {
      const typegooseOptions: TypegooseOptions = {
      }
      if (options.required !== undefined) {
        typegooseOptions.required = options.required
      }
      if (options.oneToMany !== undefined) {
        if (options.ref === undefined) {
          throw new Error(`Option 'ref' is required, at '@Prop()' decorator, above property '${target.constructor.name as string}.${key}'`)
        }
        typegooseOptions.foreignField = options.oneToMany.foreignField
        typegooseOptions.ref = options.ref
        typegooseOptions.localField = PRIMARY_KEYS_NAME
        typegooseOptions.autopopulate = true
        typegooseOptions.type = reflectedType
      }
      if (options.manyToOne !== undefined) {
        if (options.ref === undefined) {
          throw new Error(`Option 'ref' is required, at '@Prop()' decorator, above property '${target.constructor.name as string}.${key}'`)
        }
        typegooseOptions.foreignField = PRIMARY_KEYS_NAME
        typegooseOptions.ref = options.ref
        typegooseOptions.localField = options.manyToOne.localField
        typegooseOptions.autopopulate = true
        typegooseOptions.type = reflectedType
      }
      TypegooseProp(typegooseOptions)(target, key) // Apply the typegoose @Prop() decorator to the property.
    }
  }
}
