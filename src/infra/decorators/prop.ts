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
    const type = (options.graphQlType !== undefined)
      ? options.graphQlType
      : (options.primaryKey === true)
          ? ID
          : Reflect.getMetadata('design:type', target, key)

    const propOptions = {
      ...options,
      type,
      required: options.required
    }

    // Reflect.defineMetadata('propOptions', propOptions, target, key)
    // const fields = Reflect.getMetadata('fields', target)
    // fields.push(key)
    // Reflect.defineMetadata('fields', fields, target)

    Field(() => type, { nullable: options.nullable })(target, key) // Apply the graphql @Field() decorator to the property.
    if (options.primaryKey !== true) {
      TypegooseProp(propOptions)(target, key) // Apply the typegoose @Prop() decorator to the property.
    }
  }
}

/*
export function Prop (): ClassDecorator {
  return (target: any) => {
    // plugin(autopopulate as any)(target) // Apply the @plugin() decorator to the class (with 'utopopulate' plugin).
    Field()(target) // Apply the @ObjectType() decorator to the class.
  }
}
*/
