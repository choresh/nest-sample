import { type Type } from '@nestjs/common'
import { Field, ID, type ReturnTypeFunc } from '@nestjs/graphql'
import { Prop as TypegooseProp } from '@typegoose/typegoose'
import { type ArrayPropOptions, type BasePropOptions, type MapPropOptions, type PropOptionsForNumber, type PropOptionsForString, type VirtualOptions } from '@typegoose/typegoose/lib/types'
type TypegooseOptions = BasePropOptions | ArrayPropOptions | MapPropOptions | PropOptionsForNumber | PropOptionsForString | VirtualOptions
const PRIMARY_KEYS_NAME = '_id'
const PRIMARY_KEYS_TYPE = ID

export interface Relation {
  refType: () => Type<any>
}

export interface OneToMany extends Relation {
  foreignField: string
}

export interface ManyToOne extends Relation {
  localField: string
}

export interface PropOptions {
  nullable?: boolean
  primaryKey?: boolean
  oneToMany?: OneToMany
  manyToOne?: ManyToOne
  enumType?: () => any
}

/**
 * Decorator that marks a property as:
 * 1) A GraphQL property.
 * 2) A MongoDB proerty.
 */
export function Prop (options: PropOptions = {}) {
  return function (target: any, key: string) {
    const reflectedType = Reflect.getMetadata('design:type', target, key)

    if (((options.manyToOne !== undefined) || (options.oneToMany !== undefined) || (options.enumType !== undefined)) && (options.primaryKey === true)) {
      throw new Error(`Option 'primaryKey' cannot defined togather with 'manyToOne'/'oneToMany'/'enumType' options, at '@Prop()' decorator, above property '${target.constructor.name as string}.${key}'`)
    }

    if (((options.manyToOne !== undefined) || (options.oneToMany !== undefined)) && (options.enumType !== undefined)) {
      throw new Error(`Option 'enumType' cannot defined togather with 'manyToOne'/'oneToMany' options, at '@Prop()' decorator, above property '${target.constructor.name as string}.${key}'`)
    }

    if ((options.oneToMany !== undefined) && (options.manyToOne !== undefined)) {
      throw new Error(`Options 'oneToMany' and 'manyToOne' cannot defined togather, at '@Prop()' decorator, above property '${target.constructor.name as string}.${key}'`)
    }

    const typeFunc = options.manyToOne?.refType ?? options.oneToMany?.refType ?? options.enumType

    const graphQlTypeFunc: ReturnTypeFunc = (typeFunc !== undefined)
      ? (reflectedType.name === 'Array')
          ? () => [typeFunc()]
          : typeFunc
      : (options.primaryKey === true)
          ? () => PRIMARY_KEYS_TYPE
          : () => reflectedType

    Field(graphQlTypeFunc, { nullable: options.nullable })(target, key) // Apply the graphql @Field() decorator to the property.

    if (options.primaryKey !== true) {
      const typegooseOptions: TypegooseOptions = {
        required: (options.nullable !== true)
      }
      if ((options.oneToMany !== undefined) || (options.manyToOne !== undefined)) {
        if (typeFunc === undefined) {
          throw new Error(`Option 'ref' is required, at '@Prop()' decorator, above property '${target.constructor.name as string}.${key}'`)
        }
        if (options.oneToMany !== undefined) {
          typegooseOptions.foreignField = options.oneToMany.foreignField
          typegooseOptions.localField = PRIMARY_KEYS_NAME
          typegooseOptions.autopopulate = true
        }
        if (options.manyToOne !== undefined) {
          typegooseOptions.foreignField = PRIMARY_KEYS_NAME
          typegooseOptions.localField = options.manyToOne.localField
          typegooseOptions.justOne = true
          typegooseOptions.autopopulate = { maxDepth: 1 }
        }
        typegooseOptions.ref = typeFunc
        typegooseOptions.type = reflectedType
      }
      TypegooseProp(typegooseOptions)(target, key) // Apply the typegoose @Prop() decorator to the property.
    }
  }
}
